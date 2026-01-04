---
language: en
base_model: google/flan-t5-base
library_name: peft
tags:
- base_model:adapter:google/flan-t5-base
- lora
- transformers
- summarization
- abstractive-summarization
- generated_from_trainer
model-index:
- name: Abstractive Style Summarizer
  results: []
datasets:
- xsum
- cnn_dailymail
- multi_news
license: mit
---

# Abstractive Style Summarizer

This model is a fine-tuned version of [google/flan-t5-base](https://huggingface.co/google/flan-t5-base) using PEFT (LoRA). It is designed to generate abstractive summaries in three distinct styles: **Harsh** (concise), **Balanced** (standard), and **Detailed** (comprehensive).

## Model Details

### Model Description

- **Model type:** Sequence-to-Sequence Transformer (T5)
- **Language(s):** English
- **License:** MIT
- **Finetuned from model:** google/flan-t5-base
- **Training Method:** PEFT (LoRA)

### Model Sources

- **Repository:** [Flatten](https://github.com/LityoPS/Flatten)
- **Base Model:** [google/flan-t5-base](https://huggingface.co/google/flan-t5-base)

## Uses

### Direct Use

The model interprets a prefixed prompt to determine the style of the summary.
- **Harsh**: Generates very short, punchy summaries (approx. 35% of input length).
- **Balanced**: Generates standard news summaries (approx. 50% of input length).
- **Detailed**: Generates in-depth summaries (approx. 70% of input length).

### Prompt Format

The input text should be prefixed with the desired style:
```
Summarize {Style}: {Input Text}
```
Example: `Summarize Harsh: The Walt Disney Co. announced...`

## Training Details

### Training Data

The model was trained on a combined dataset of 12,000 samples, split into 80% Train, 10% Validation, and 10% Test.

| Style | Source Dataset | Size |
| :--- | :--- | :--- |
| **Harsh** | [XSum](https://huggingface.co/datasets/xsum) | 4000 |
| **Balanced** | [CNN/DailyMail](https://huggingface.co/datasets/cnn_dailymail) | 4000 |
| **Detailed** | [Multi-News](https://huggingface.co/datasets/multi_news) | 4000 |

### Training Procedure

#### Training Hyperparameters

- **Learning Rate:** 5e-4
- **Batch Size:** 4 per device
- **Gradient Accumulation Steps:** 2
- **Num Epochs:** 5
- **Optimizer:** AdamW
- **LR Scheduler:** Linear with warmup (ratio 0.05)
- **Mixed Precision:** BF16

#### LoRA Configuration

- **r:** 32
- **lora_alpha:** 64
- **lora_dropout:** 0.05
- **target_modules:** ["q", "k", "v", "o"]
- **bias:** "none"
- **task_type:** "SEQ_2_SEQ_LM"

### Evaluation Results

Evaluated on the held-out test set (1,200 samples) at Step 6000.

| Metric | Score |
| :--- | :--- |
| **ROUGE-1** | 0.3925 |
| **ROUGE-2** | 0.1608 |
| **ROUGE-L** | 0.2776 |
| **Validation Loss** | 0.7824 |

## Environmental Impact

- **Hardware Type:** CUDA-enabled GPU
- **Compute:** LoRA fine-tuning (Parameters: 7M trainable / 254M total)

## Framework Versions

- Datasets==3.6.0
- Pytorch>=2.5.1
- Transformers>=4.36.0
- PEFT>=0.8.0