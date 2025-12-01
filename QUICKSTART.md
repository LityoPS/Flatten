# Text Summarizer - Quick Start Guide

## Prerequisites

1. **Python 3.8+** installed
2. **Node.js 18+** installed
3. Trained model checkpoint in `results_t5small/checkpoint-1000`

## Setup Instructions

### 1. Install Python Dependencies

Navigate to the project root and install the required packages:

```bash
cd c:\Users\lityo\Desktop\Abstractive-Text-Summarizer
pip install -r requirements.txt
```

### 2. Start the Python API Server

In one terminal, start the FastAPI backend:

```bash
python api_server.py
```

You should see:
```
Loading model and tokenizer...
Model loaded successfully on cuda  # or cpu
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3. Start the Next.js Development Server

In a **separate terminal**, navigate to the synopsis directory and start Next.js:

```bash
cd synopsis
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Scroll to the **Summarizer** section
3. Paste your text in the large input box
4. Select a summary style:
   - **Harsh** (Red): Short, concise summary
   - **Balanced** (Orange): Medium-length summary
   - **Detailed** (Green): Comprehensive summary
5. Click **Generate Summary**
6. Your summary will appear in the output box
7. Click the copy button (top-right of summary) to copy the text
8. View metadata (word count, spaces, symbols) below the summary

## Troubleshooting

### Model not found error
- Ensure the checkpoint exists at `results_t5small/checkpoint-1000`
- Check the console output from the Python server

### Connection error in frontend
- Verify the Python API server is running on port 8000
- Check that both servers are running simultaneously

### Summary not generating
- Check browser console for errors
- Verify the Python server logs for any errors
- Ensure you have enough RAM (model requires ~1GB)

## Features

✅ Three summary styles with different lengths  
✅ Real-time word/character counting  
✅ Loading indicators during generation  
✅ One-click copy to clipboard  
✅ Summary metadata (words, spaces, symbols)  
✅ Auto-scroll to summary after generation  
✅ Full dark mode support  
✅ Responsive design  
