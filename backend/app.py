import gradio as gr
from transformers import pipeline

MODEL_ID = 'lityops/Style-Summarizer'

summarizer = pipeline("summarization", model=MODEL_ID)

def generate_summary(text, style):
  if not text or len(text.strip()) < 50:
    return "Input must at least be 50 words long"

  input_text = f"summarize {style}: {text}"
  input_words = len(text.split())

  if style == 'harsh':
    max_len = int(input_words * 0.35)
    min_len = 5
    rep_penalty = 2.5
    beam_size = 4
  elif style == 'standard':
    max_len = int(input_words * 0.50)
    min_len = 20
    rep_penalty = 1.5
    beam_size = 4
  else:
    max_len = int(input_words * 0.70)
    min_len = 50
    rep_penalty = 1.2
    beam_size = 4

  max_len = min(max_len, 256)
  
  output = summarizer(
    input_text,
    max_length=max_len, 
    min_length=min_len, 
    num_beams=beam_size,
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

with gr.Blocks(css=custom_css, theme=gr.themes.Base()) as demo:
  with gr.Column(elem_id="header"):
    gr.Markdown("# Style Summarizer")
    gr.Markdown("Fine-tuned Flan-T5 model for multi-style document summarization.")

  with gr.Row():
    with gr.Column(scale=1):
      input_box = gr.Textbox(
        label="Input Text", 
        placeholder="Enter text to be summarized...", 
        lines=12
      )
      style_radio = gr.Radio(
        choices=["harsh", "standard", "detailed"], 
        label="Summary Type", 
        value="standard"
      )
      submit_btn = gr.Button("Process Summary", variant="primary")
      
    with gr.Column(scale=1):
      output_box = gr.Textbox(
        label="Output Summary", 
        lines=15, 
        interactive=False,
        show_copy_button=True
      )

  submit_btn.click(
    fn=generate_summary, 
    inputs=[input_box, style_radio], 
    outputs=output_box
  )

demo.launch()