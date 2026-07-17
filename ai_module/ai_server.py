import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Global variables to hold our model components
model_data = None
df = None
cosine_sim = None
vectorizer = None

def load_model():
    global model_data, df, cosine_sim, vectorizer
    model_path = os.path.join(os.path.dirname(__file__), "models", "recommender_model.pkl")
    if not os.path.exists(model_path):
        print(f"Warning: Model not found at {model_path}. Please run train_recommender.py first.")
        return False
    
    try:
        with open(model_path, "rb") as f:
            model_data = pickle.load(f)
        df = model_data["df"]
        cosine_sim = model_data["cosine_sim"]
        vectorizer = model_data["vectorizer"]
        print("Model loaded successfully.")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

# Load model on startup
load_model()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "model_loaded": df is not None})

@app.route("/recommend", methods=["POST"])
def recommend():
    if df is None:
        # Reload attempt
        if not load_model():
            return jsonify({"error": "AI Model not loaded"}), 500
            
    try:
        data = request.json or {}
        product_id = data.get("productId")
        
        if not product_id:
            return jsonify({"error": "productId is required"}), 400
            
        # Find index in DataFrame
        matching_rows = df[df["id"] == int(product_id)]
        if matching_rows.empty:
            return jsonify({"recommendations": []})
            
        idx = matching_rows.index[0]
        
        # Get pairwise similarity scores
        sim_scores = list(enumerate(cosine_sim[idx]))
        # Sort products based on similarity scores, exclude self
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]
        
        recommended_indices = [i[0] for i in sim_scores]
        recommendations = df.iloc[recommended_indices].to_dict(orient="records")
        
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        print(f"Recommendation error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    if df is None or vectorizer is None:
        if not load_model():
            return jsonify({"error": "AI Model not loaded"}), 500
            
    try:
        data = request.json or {}
        message = data.get("message", "").strip()
        
        if not message:
            return jsonify({"reply": "Hello! I am your ShopEZ AI Assistant. How can I help you today?"})
            
        # Vectorize the user query
        query_vector = vectorizer.transform([message])
        
        # Compute cosine similarity between query and all items
        tfidf_matrix = model_data["tfidf_matrix"]
        query_sims = cosine_similarity(query_vector, tfidf_matrix).flatten()
        
        # Get top 3 matching items
        top_indices = np.argsort(query_sims)[-3:][::-1]
        
        matches = []
        for idx in top_indices:
            score = query_sims[idx]
            if score > 0.05:  # Similarity threshold
                matches.append(df.iloc[idx].to_dict())
                
        if matches:
            products_list = "\n".join([f"- **{m['title']}** (${m['price'] or m.get('price', 0)})" for m in matches])
            reply = f"I found some products matching your request:\n\n{products_list}\n\nWould you like me to add any of these to your cart?"
            return jsonify({
                "reply": reply,
                "suggestedProducts": matches
            })
        else:
            return jsonify({
                "reply": "I couldn't find any specific products in our catalog matching that query. Try asking for items like 'backpack', 'monitor', or 't-shirts'!"
            })
    except Exception as e:
        print(f"Chatbot error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"Starting ShopEZ AI Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
