# Flatten: Abstractive Text Summarizer

This repository contains a full-stack application and model training resources for an abstractive text summarizer. It features a fine-tuned T5 model capable of generating summaries in different styles: Harsh, Standard, and Detailed.

## Project Structure

- **frontend/**: A Next.js web application that provides a user interface for the summarizer.
- **backend/**: A Gradio space that provides an API for the summarizer.
- **model/**: Contains Jupyter notebooks for training and inference experiments.
  - `train.ipynb`: Notebook used for fine-tuning the model.
  - `inference.ipynb`: Notebook for testing model inference.

## Live Demo

You can test the summarizer directly on the deployed website: [flatten-ten.vercel.app](https://flatten-ten.vercel.app/)

---

## T5-Base Summarizer (Multi-Style)

This model is a fine-tuned version of `google/flan-t5-base` trained on samples from CNN/DailyMail and XSum.
It generates summaries in three styles: **Harsh (Concise)**, **Balanced**, and **Detailed**.

### Model Description
- **Model Type**: Sequence-to-Sequence Transformer (T5)
- **Language**: English
- **Base Model**: `google/flan-t5-base`
- **Training Data**: ~12k mixed samples from XSUM, CNN/DailyMail, and MultiNews

### Key Features
This model supports a **Style Prompt** that determines summary length and density:

1. **Harsh**
   - Very concise, headline-like summaries
   - Trained with XSum

2. **Balanced**
   - Standard, general-purpose summaries
   - Trained with CNN/DailyMail

3. **Detailed**
   - Longer, more contextual summaries
   - Trained with MultiNews

---

## Running the Frontend Application

To run the web interface locally:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
