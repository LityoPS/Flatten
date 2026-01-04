# Model Development

Notebooks for training and evaluating the Abstractive Style Summarizer.

## Files
- **EDA.ipynb**: Dataset exploration (XSum, CNN/DailyMail, MultiNews).
- **LoRAComparison.ipynb**: Analyzing parameter efficiency with LoRA and without LoRA.
- **ModelComparison.ipynb**: Benchmarking against other T5 models/baselines.
- **ModelTraining.ipynb**: Fine-tuning `google/flan-t5-base` using LoRA.
- **ModelInference.ipynb**: Testing model generation across styles.
- **results**: Contains the fine-tuned adapter weights and configuration.
