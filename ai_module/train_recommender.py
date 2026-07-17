import os
import json
import pickle
import numpy as np
import pandas as pd
import requests
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import classification_report, confusion_matrix

def fetch_products():
    print("Fetching product data for AI/ML training...")
    try:
        res = requests.get("https://dummyjson.com/products?limit=100", timeout=10)
        if res.ok:
            data = res.json()
            return data["products"]
    except Exception as e:
        print(f"Network fetch failed: {e}. Using fallback dataset.")
    
    # Fallback product list
    return [
        {"id": 1, "title": "Fjallraven Backpack", "category": "beauty", "description": "Perfect pack for everyday use and walks in the forest."},
        {"id": 2, "title": "Casual Premium Slim Fit T-Shirts", "category": "groceries", "description": "Slim-fitting style, contrast raglan long sleeve."},
        {"id": 3, "title": "Mens Cotton Jacket", "category": "groceries", "description": "Great outerwear jackets for Spring/Autumn/Winter."},
        {"id": 4, "title": "Mens Casual Slim Fit", "category": "groceries", "description": "Casual slim fit lightweight shirt."},
        {"id": 5, "title": "WD 2TB External Hard Drive", "category": "furniture", "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers."},
        {"id": 6, "title": "Samsung 49-Inch Curved Monitor", "category": "furniture", "description": "Super ultrawide screen QLED curved gaming monitor."}
    ]

def train_model():
    products = fetch_products()
    df = pd.DataFrame(products)
    
    # Preprocessing: Combine title, description, and category into a single text representation
    df["content"] = df["title"] + " " + df["description"] + " " + df["category"]
    df["content"] = df["content"].fillna("")
    
    print(f"Loaded {len(df)} products for recommendation engine training.")
    
    # Initialize TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["content"])
    
    # Compute Cosine Similarity Matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Save the model components
    model_data = {
        "df": df[["id", "title", "category", "description"]],
        "tfidf_matrix": tfidf_matrix,
        "cosine_sim": cosine_sim,
        "vectorizer": vectorizer
    }
    
    os.makedirs("models", exist_ok=True)
    with open("models/recommender_model.pkl", "wb") as f:
        pickle.dump(model_data, f)
    print("Model saved to models/recommender_model.pkl")
    
    # ==========================
    # EVALUATE RECOMMENDATION ENGINE
    # ==========================
    # Ground Truth: Category Matching
    # Recommend top K (K=3) for each item. If category matches, it's correct.
    K = 3
    y_true = []
    y_pred = []
    
    precisions = []
    recalls = []
    
    for idx, row in df.iterrows():
        # Get similarities for this product
        sim_scores = list(enumerate(cosine_sim[idx]))
        # Sort by similarity, skip the item itself (index idx)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:K+1]
        
        target_category = row["category"]
        matches = 0
        
        for sim_idx, score in sim_scores:
            rec_category = df.iloc[sim_idx]["category"]
            y_true.append(target_category)
            y_pred.append(rec_category)
            if rec_category == target_category:
                matches += 1
                
        precision = matches / K
        # Total category count in catalog (excluding self)
        total_category_count = len(df[df["category"] == target_category]) - 1
        recall = matches / total_category_count if total_category_count > 0 else 1.0
        
        precisions.append(precision)
        recalls.append(recall)
        
    avg_precision = np.mean(precisions)
    avg_recall = np.mean(recalls)
    f1_score = 2 * (avg_precision * avg_recall) / (avg_precision + avg_recall) if (avg_precision + avg_recall) > 0 else 0
    
    print("\n--- Recommendation Metrics Report ---")
    print(f"Precision @ {K}: {avg_precision:.4f}")
    print(f"Recall @ {K}: {avg_recall:.4f}")
    print(f"F1-Score @ {K}: {f1_score:.4f}")
    
    # Save Report details to file
    report_content = f"""# AI Recommender System Evaluation Report

## Model Summary
- **Architecture**: Content-based filtering via TF-IDF Vectorization and Cosine Similarity.
- **Dataset**: DummyJSON Catalog API (100 products).
- **Features Used**: Title, Description, and Category.
- **Model Storage**: Saved as a Python pickle file.

## Performance Metrics (K = {K})
- **Precision @ {K}**: {avg_precision:.4f} (proportion of recommended products belonging to the same category)
- **Recall @ {K}**: {avg_recall:.4f} (proportion of total category items retrieved in recommendations)
- **F1-Score**: {f1_score:.4f}

## Classification Report
```text
{classification_report(y_true, y_pred, zero_division=0)}
```
"""
    
    with open("recommender_report.md", "w") as rf:
        rf.write(report_content)
    print("Metrics report written to recommender_report.md")
    
    # Plot 1: Confusion Matrix of Categories
    categories = sorted(df["category"].unique())
    cm = confusion_matrix(y_true, y_pred, labels=categories)
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=categories, yticklabels=categories)
    plt.title("Product Recommendation Confusion Matrix (Category Map)")
    plt.ylabel("Actual Category")
    plt.xlabel("Recommended Category")
    plt.tight_layout()
    plt.savefig("confusion_matrix.png")
    plt.close()
    print("Saved confusion_matrix.png")
    
    # Plot 2: Evaluation Metrics Chart
    plt.figure(figsize=(8, 5))
    metrics = ["Precision", "Recall", "F1-Score"]
    values = [avg_precision, avg_recall, f1_score]
    colors = ["#4f46e5", "#10b981", "#f59e0b"]
    
    bars = plt.bar(metrics, values, color=colors, width=0.5)
    plt.ylim(0, 1.1)
    plt.title(f"Model Evaluation Metrics (K={K})")
    plt.ylabel("Score")
    
    # Add values on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, height + 0.02, f"{height:.2f}", ha="center", va="bottom", fontweight="bold")
        
    plt.tight_layout()
    plt.savefig("metrics_plot.png")
    plt.close()
    print("Saved metrics_plot.png")

if __name__ == "__main__":
    train_model()
