# Model Development

Notebooks for training and evaluating the AbstractiveStyle Summarizer.

## Files
- **EDA.ipynb**: Dataset exploration (XSum, CNN/DailyMail, MultiNews).
- **ModelTraining.ipynb**: Fine-tuning `google/flan-t5-base` using LoRA.
- **ModelInference.ipynb**: Testing model generation across styles.
- **ModelComparison.ipynb**: Benchmarking against other T5 models/baselines.
- **LoRAComparison.ipynb**: Analyzing parameter efficiency.
- **results/**: Contains the fine-tuned adapter weights and configuration.