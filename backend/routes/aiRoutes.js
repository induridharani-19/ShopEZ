import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Helper: Lightweight JS TF-IDF & Cosine Similarity for recommendations fallback
function getJSTFIDRecommendations(targetProduct, allProducts, limit = 5) {
  try {
    const buildDocText = (p) => {
      return `${p.title || ""} ${p.description || ""} ${p.category || ""}`.toLowerCase();
    };

    const docs = allProducts.map(p => ({
      id: p.id,
      text: buildDocText(p),
      product: p
    }));

    const targetText = buildDocText(targetProduct);

    // Get all unique terms
    const allWords = new Set();
    docs.forEach(doc => {
      doc.text.split(/\W+/).filter(w => w.length > 2).forEach(w => allWords.add(w));
    });
    const terms = Array.from(allWords);

    // Compute IDF
    const N = docs.length;
    const idf = {};
    terms.forEach(term => {
      const docCount = docs.filter(doc => doc.text.includes(term)).length;
      idf[term] = Math.log(1 + (N / (docCount || 1)));
    });

    // Vectorize helper
    const vectorize = (text) => {
      const words = text.split(/\W+/).filter(w => w.length > 2);
      const tf = {};
      words.forEach(w => tf[w] = (tf[w] || 0) + 1);
      
      const vector = terms.map(term => {
        const tfVal = tf[term] || 0;
        return tfVal * (idf[term] || 0);
      });
      return vector;
    };

    const cosineSimilarity = (vecA, vecB) => {
      let dotProduct = 0.0;
      let normA = 0.0;
      let normB = 0.0;
      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
      }
      if (normA === 0 || normB === 0) return 0;
      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    };

    const targetVector = vectorize(targetText);
    const scoredDocs = docs
      .filter(doc => doc.id !== targetProduct.id)
      .map(doc => {
        const docVector = vectorize(doc.text);
        const sim = cosineSimilarity(targetVector, docVector);
        return { product: doc.product, similarity: sim };
      })
      .sort((a, b) => b.similarity - a.similarity);

    return scoredDocs.slice(0, limit).map(item => item.product);
  } catch (err) {
    console.error("Fallback recommendation error:", err);
    // Simple fallback
    return allProducts
      .filter(p => p.id !== targetProduct.id && p.category === targetProduct.category)
      .slice(0, limit);
  }
}

// 1. RECOMMENDATION ENDPOINT
router.post("/recommend", async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const numericId = parseInt(productId);
    const targetProduct = await Product.findOne({ id: numericId });
    if (!targetProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Try communicating with Flask AI Server
    try {
      const flaskRes = await fetch("http://localhost:5001/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: numericId })
      });

      if (flaskRes.ok) {
        const data = await flaskRes.json();
        // Map Flask output items to our full DB documents
        const recommendedIds = data.recommendations.map(r => r.id);
        const fullProducts = await Product.find({ id: { $in: recommendedIds } });
        return res.json(fullProducts);
      }
    } catch (flaskErr) {
      console.warn("Flask AI Server down or unreachable. Executing JS fallback recommendations engine.");
    }

    // JS Fallback recommendation engine
    const allProducts = await Product.find();
    const recommendedList = getJSTFIDRecommendations(targetProduct, allProducts, 5);
    res.json(recommendedList);
  } catch (error) {
    console.error("AI Recommendation route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 2. CONVERSATIONAL CHATBOT ENDPOINT
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.json({ reply: "Hello! I am your ShopEZ AI Shopping Assistant. How can I help you today?" });
    }

    // Try communicating with Flask AI Server
    try {
      const flaskRes = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (flaskRes.ok) {
        const data = await flaskRes.json();
        return res.json(data);
      }
    } catch (flaskErr) {
      console.warn("Flask AI Server unreachable. Executing JS fallback Chatbot.");
    }

    // JS Fallback NLP Chatbot
    const words = message.toLowerCase().split(/\W+/);
    const allProducts = await Product.find();
    
    // Score products based on matching keywords
    const scoredProducts = allProducts.map(p => {
      let score = 0;
      const text = `${p.title} ${p.description} ${p.category}`.toLowerCase();
      words.forEach(word => {
        if (word.length > 2 && text.includes(word)) {
          score += 1;
        }
      });
      return { product: p, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);

    if (scoredProducts.length > 0) {
      const itemsList = scoredProducts.map(p => `- **${p.title}** (₹${p.price})`).join("\n");
      res.json({
        reply: `I searched our catalog and found these matching products:\n\n${itemsList}\n\nCan I help you with anything else?`,
        suggestedProducts: scoredProducts
      });
    } else {
      res.json({
        reply: "I couldn't find any products in our catalog matching that request. Could you try checking for categories like 'Beauty', 'Fragrances', 'Furniture' or 'Groceries'?"
      });
    }
  } catch (error) {
    console.error("AI Chatbot route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
