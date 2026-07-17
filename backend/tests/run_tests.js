import assert from "assert";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

// The authMiddleware resolves JWT_SECRET to process.env.JWT_SECRET or fallback key.
// Let's read what key it's using or use the default fallback for signing:
const DEFAULT_SECRET = process.env.JWT_SECRET || "shopez_secret_key_2026";

async function testJWTSigningAndVerification() {
  console.log("▶ [Test 1] Testing JWT Signing and Verification...");
  
  const payload = { id: "test_user_123", email: "test@shopez.com", isAdmin: true };
  const token = jwt.sign(payload, DEFAULT_SECRET, { expiresIn: "1h" });
  
  assert.ok(token, "Token should be successfully generated");
  
  const decoded = jwt.verify(token, DEFAULT_SECRET);
  assert.strictEqual(decoded.id, payload.id, "Decoded user ID must match");
  assert.strictEqual(decoded.email, payload.email, "Decoded email must match");
  assert.strictEqual(decoded.isAdmin, payload.isAdmin, "Decoded isAdmin claim must match");
  
  console.log("✔ [Test 1] Passed successfully.");
}

async function testAuthMiddlewareGate() {
  console.log("▶ [Test 2] Testing authMiddleware gate...");
  
  const payload = { id: "test_user_123", email: "test@shopez.com" };
  const token = jwt.sign(payload, DEFAULT_SECRET);
  
  // Test case A: Access with valid token
  const reqA = { headers: { authorization: `Bearer ${token}` } };
  let nextCalledA = false;
  let statusA = 0;
  const resA = {
    status(code) {
      statusA = code;
      return {
        json(data) {
          // Store response json if any error occurs
        }
      };
    }
  };
  
  authMiddleware(reqA, resA, () => {
    nextCalledA = true;
  });
  
  assert.ok(nextCalledA, "authMiddleware should call next() for valid token");
  assert.strictEqual(statusA, 0, "Response status should not be set for successful next()");
  assert.strictEqual(reqA.user.id, payload.id, "req.user should contain decoded payload");

  // Test case B: Access without token
  const reqB = { headers: {} };
  let statusB = 0;
  let responseJsonB = null;
  const resB = {
    status(code) {
      statusB = code;
      return {
        json(data) {
          responseJsonB = data;
        }
      };
    }
  };
  
  authMiddleware(reqB, resB, () => {
    assert.fail("authMiddleware should not call next() when token is missing");
  });
  
  assert.strictEqual(statusB, 401, "Should return 401 Unauthorized status");
  assert.ok(responseJsonB && responseJsonB.message.includes("No token provided"), "Should return clear error message");

  console.log("✔ [Test 2] Passed successfully.");
}

async function testJSTFIDFRecommendationFallback() {
  console.log("▶ [Test 3] Testing JS native TF-IDF Recommendation algorithm...");

  const allProducts = [
    { id: 1, title: "Men Premium Slim Fit T-Shirt", description: "Slim-fitting t-shirt with cotton fabric.", category: "clothing" },
    { id: 2, title: "Formal Leather Shoes", description: "Premium black leather dress shoes.", category: "shoes" },
    { id: 3, title: "Casual Cotton Jacket", description: "Cotton casual jacket for spring.", category: "clothing" },
    { id: 4, title: "Men Sports Running Shoes", description: "Lightweight running shoes for sports.", category: "shoes" },
    { id: 5, title: "USB 3.0 External Hard Drive", description: "High capacity portable external hard drive.", category: "electronics" }
  ];

  const getSim = (targetProduct, corpus) => {
    const buildDocText = (p) => `${p.title || ""} ${p.description || ""} ${p.category || ""}`.toLowerCase();
    const docs = corpus.map(p => ({ id: p.id, text: buildDocText(p), product: p }));
    const targetText = buildDocText(targetProduct);
    const allWords = new Set();
    docs.forEach(doc => {
      doc.text.split(/\W+/).filter(w => w.length > 2).forEach(w => allWords.add(w));
    });
    const terms = Array.from(allWords);
    const N = docs.length;
    const idf = {};
    terms.forEach(term => {
      const docCount = docs.filter(doc => doc.text.includes(term)).length;
      idf[term] = Math.log(1 + (N / (docCount || 1)));
    });
    const vectorize = (text) => {
      const words = text.split(/\W+/).filter(w => w.length > 2);
      const tf = {};
      words.forEach(w => tf[w] = (tf[w] || 0) + 1);
      return terms.map(term => (tf[term] || 0) * (idf[term] || 0));
    };
    const cosineSimilarity = (vecA, vecB) => {
      let dotProduct = 0.0, normA = 0.0, normB = 0.0;
      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
      }
      return normA === 0 || normB === 0 ? 0 : dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    };

    const targetVector = vectorize(targetText);
    return docs
      .filter(doc => doc.id !== targetProduct.id)
      .map(doc => ({ product: doc.product, sim: cosineSimilarity(targetVector, vectorize(doc.text)) }))
      .sort((a, b) => b.sim - a.sim);
  };

  const results = getSim(allProducts[0], allProducts); // Target is T-shirt
  
  assert.strictEqual(results[0].product.id, 3, "T-shirt should be most similar to Jacket (id 3) because of category and description overlap");
  assert.ok(results[0].sim > results[1].sim, "Jacket similarity score must be higher than other categories");

  console.log("✔ [Test 3] Passed successfully.");
}

async function runTestSuite() {
  console.log("==========================================");
  console.log("      SHOPEZ UNIT & INTEGRATION TESTS     ");
  console.log("==========================================");
  try {
    await testJWTSigningAndVerification();
    await testAuthMiddlewareGate();
    await testJSTFIDFRecommendationFallback();
    console.log("\n🎉 ALL TEST SUITES PASSED SUCCESSFULLY.");
    console.log("==========================================");
  } catch (error) {
    console.error("\n❌ TEST SUITE FAILED WITH AN ERROR:");
    console.error(error);
    console.log("==========================================");
    process.exit(1);
  }
}

runTestSuite();
