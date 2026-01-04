import gradio as gr
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
from peft import PeftModel

ADAPTER_HUB = "lityops/Abstractive-Style-Summarizer"
BASE_MODEL_NAME = "google/flan-t5-base"

base_model = AutoModelForSeq2SeqLM.from_pretrained(BASE_MODEL_NAME)
model = PeftModel.from_pretrained(base_model, ADAPTER_HUB)
tokenizer = AutoTokenizer.from_pretrained(ADAPTER_HUB)

summarizer = pipeline(
  "summarization", 
  model=model, 
  tokenizer=tokenizer
)

def generate_summary(text, style):
  if not text or len(text.split()) < 100:
    return "Input must at least be 100 words long"
  if len(text.split()) > 512:
    return "Input must at most be 512 words long"

  input_text = f"Summarize {style}: {text}"
  input_words = len(text.split())

  if style == 'Harsh':
    max_len = int(input_words * 0.35)
    min_len = 5
    rep_penalty = 2.5
    length_penalty = 1.5
    beam_size = 4
    max_cap = 120
  elif style == 'Balanced':
    max_len = int(input_words * 0.50)
    min_len = 20
    rep_penalty = 1.5
    length_penalty = 1.2
    beam_size = 4
    max_cap = 180
  else:
    max_len = int(input_words * 0.70)
    min_len = 50
    rep_penalty = 1.2
    length_penalty = 0.8
    beam_size = 4
    max_cap = 256

  max_len = min(max_len, max_cap)
  
  output = summarizer(
    input_text,
    max_length=max_len, 
    min_length=min_len, 
    num_beams=beam_size,
    length_penalty=length_penalty,
    repetition_penalty=rep_penalty,
    no_repeat_ngram_size=3,
    early_stopping=True
  )
  return output[0]["summary_text"]

custom_css = """
#header {text-align: center; margin-bottom: 25px;}
.gradio-container {max-width: 1000px !important;}
footer {display: none !important;}
"""

custom_css = """
#header {text-align: center; margin-bottom: 25px;}
.gradio-container {max-width: 95% !important;}
footer {display: none !important;}
"""

with gr.Blocks() as demo:
  with gr.Column(elem_id="header"):
    gr.Markdown("# Style Summarizer")
    gr.Markdown("Fine-tuned Flan-T5 model for multi-style document summarization.")

  with gr.Row():
    with gr.Column(scale=1):
      input_box = gr.Textbox(
        label="Input Text", 
        placeholder="Enter text to be summarized...", 
        lines=15
      )
      style_radio = gr.Radio(
        choices=["Harsh", "Balanced", "Detailed"], 
        label="Summary Type", 
        value="Balanced"
      )
      with gr.Row():
        clear_btn = gr.Button("Clear Input")
        submit_btn = gr.Button("Generate Summary", variant="primary")
      
    with gr.Column(scale=1):
      output_box = gr.Textbox(
        label="Output Summary", 
        lines=18, 
        interactive=False
      )
      copy_btn = gr.Button("Copy to Clipboard")

  submit_btn.click(
    fn=generate_summary, 
    inputs=[input_box, style_radio], 
    outputs=output_box
  )

  clear_btn.click(
    fn=lambda: "",
    inputs=None,
    outputs=input_box
  )

  copy_btn.click(
    fn=None,
    inputs=[output_box],
    js="(v) => { navigator.clipboard.writeText(v); }"
  )

demo.launch(css=custom_css, theme=gr.themes.Base())