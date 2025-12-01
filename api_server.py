from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import T5TokenizerFast, T5ForConditionalGeneration
import torch
import os

app = FastAPI()

# Configure CORS - allow requests from frontend
# In production, set FRONTEND_URL environment variable to your Vercel deployment URL
allowed_origins = os.getenv("FRONTEND_URL", "http://localhost:3000").split(",")
print(f"Allowed origins: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and tokenizer
model = None
tokenizer = None
device = None

class SummarizeRequest(BaseModel):
    text: str
    summary_style: str  # 'harsh', 'balanced', or 'detailed'

class SummarizeResponse(BaseModel):
    summary: str
    style: str

@app.on_event("startup")
async def load_model():
    """Load the fine-tuned T5 model on startup"""
    global model, tokenizer, device
    
    print("Loading model and tokenizer...")
    model_path = "./results_t5small/checkpoint-1000"
    
    if not os.path.exists(model_path):
        print(f"Warning: Model path {model_path} not found!")
        return
    
    try:
        tokenizer = T5TokenizerFast.from_pretrained(model_path)
        model = T5ForConditionalGeneration.from_pretrained(model_path)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.to(device)
        model.eval()
        print(f"Model loaded successfully on {device}")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    """Generate summary based on input text and style"""
    if model is None or tokenizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Define generation parameters based on style
    style_params = {
        "harsh": {"max_length": 50, "min_length": 20},
        "balanced": {"max_length": 100, "min_length": 40},
        "detailed": {"max_length": 200, "min_length": 80}
    }
    
    style = request.summary_style.lower()
    if style not in style_params:
        raise HTTPException(status_code=400, detail="Invalid summary style")
    
    params = style_params[style]
    
    try:
        # Prepare input
        input_text = f"summarize: {request.text}"
        inputs = tokenizer(
            input_text,
            max_length=512,
            truncation=True,
            padding="max_length",
            return_tensors="pt"
        ).to(device)
        
        # Generate summary
        with torch.no_grad():
            summary_ids = model.generate(
                inputs["input_ids"],
                max_length=params["max_length"],
                min_length=params["min_length"],
                num_beams=4,
                length_penalty=2.0,
                early_stopping=True
            )
        
        # Decode summary
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        
        return SummarizeResponse(summary=summary, style=style)
    
    except Exception as e:
        print(f"Error during summarization: {e}")
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "device": str(device) if device else "unknown"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
