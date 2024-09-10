from transformers import AutoTokenizer,AutoModelForSequenceClassification
import torch
from typing import Tuple
device = "cuda:0" if torch.cuda.is_available() else "cpu"

tokenizers = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert").to(device)
labels = ["positive", "negative", "neutral"]


def estimate_sentiment(news):
    if news:
        tokens = tokenizers(news, return_tensors="pt", padding=True).to(device)

        logits = model(tokens["input_ids"], attention_mask=tokens["attention_mask"])["logits"]
        result = torch.nn.functional.softmax(logits, dim=-1)

        probability, idx = torch.max(result, dim=-1)
        sentiment = labels[idx.item()]
        return probability.item(), sentiment
    else:
        return 0, labels[-1]



if __name__ == "__main__":
    tensor, sentiment = estimate_sentiment(["market responsed positively ro the news!"])
    print(tensor, sentiment)
    print(torch.cuda.is_available())
