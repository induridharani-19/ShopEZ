# AI Recommender System Evaluation Report

## Model Summary
- **Architecture**: Content-based filtering via TF-IDF Vectorization and Cosine Similarity.
- **Dataset**: DummyJSON Catalog API (100 products).
- **Features Used**: Title, Description, and Category.
- **Model Storage**: Saved as a Python pickle file.

## Performance Metrics (K = 3)
- **Precision @ 3**: 0.7900 (proportion of recommended products belonging to the same category)
- **Recall @ 3**: 0.3099 (proportion of total category items retrieved in recommendations)
- **F1-Score**: 0.4452

## Classification Report
```text
                     precision    recall  f1-score   support

             beauty       0.56      0.60      0.58        15
         fragrances       1.00      1.00      1.00        15
          furniture       0.70      0.47      0.56        15
          groceries       0.81      0.74      0.77        81
    home-decoration       0.69      0.73      0.71        15
kitchen-accessories       0.76      0.83      0.79        90
            laptops       0.94      1.00      0.97        15
        mens-shirts       0.83      1.00      0.91        15
         mens-shoes       0.83      0.67      0.74        15
       mens-watches       0.86      1.00      0.92        18
 mobile-accessories       0.67      0.33      0.44         6

           accuracy                           0.79       300
          macro avg       0.79      0.76      0.76       300
       weighted avg       0.79      0.79      0.78       300

```
