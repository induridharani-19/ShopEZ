import { useState, useRef, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 🤖 I am your ShopEZ AI Assistant. Looking for something special? Tell me what you're shopping for (e.g., 'fragrances', 'backpacks', 'furniture')!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInputText("");
    setLoading(true);

    try {
      const res = await API.post("/ai/chat", { message: userMsg });
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
          suggestedProducts: res.data.suggestedProducts
        }
      ]);
    } catch (err) {
      console.error("Chatbot query error:", err);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I am having trouble connecting to the AI brain right now. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, fontFamily: "Outfit, sans-serif" }}>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "white",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.2s ease",
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "75px",
            right: "0",
            width: "380px",
            height: "500px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "white",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "24px" }}>🤖</div>
            <div>
              <h4 style={{ margin: 0, fontWeight: 600, fontSize: "16px" }}>ShopEZ AI Advisor</h4>
              <span style={{ fontSize: "12px", opacity: 0.85 }}>Online & ready to assist</span>
            </div>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#f8fafc",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    background: msg.sender === "user" ? "#4f46e5" : "white",
                    color: msg.sender === "user" ? "white" : "#1e293b",
                    padding: "10px 14px",
                    borderRadius: msg.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    whiteSpace: "pre-line"
                  }}
                >
                  {msg.text}
                </div>

                {/* Suggested Products Render */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px", width: "100%" }}>
                    {msg.suggestedProducts.map(prod => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: "flex",
                          gap: "10px",
                          background: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "8px",
                          textDecoration: "none",
                          color: "inherit",
                          alignItems: "center",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                          transition: "border-color 0.2s",
                          cursor: "pointer"
                        }}
                      >
                        <img
                          src={prod.image || prod.thumbnail}
                          alt={prod.title}
                          style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "4px" }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {prod.title}
                          </div>
                          <div style={{ fontSize: "11px", color: "#4f46e5", fontWeight: "bold" }}>₹{prod.price}</div>
                        </div>
                        <span style={{ fontSize: "14px", color: "#94a3b8" }}>➔</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: "flex-start", display: "flex", gap: "4px", background: "white", padding: "10px 14px", borderRadius: "14px 14px 14px 2px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <span className="dot" style={{ width: "6px", height: "6px", background: "#4f46e5", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out both" }} />
                <span className="dot" style={{ width: "6px", height: "6px", background: "#4f46e5", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out both 0.2s" }} />
                <span className="dot" style={{ width: "6px", height: "6px", background: "#4f46e5", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out both 0.4s" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: "12px 16px",
              background: "white",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "8px"
            }}
          >
            <input
              type="text"
              placeholder="Ask for recommendations..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              style={{
                flex: 1,
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px"
              }}
            >
              ➔
            </button>
          </form>
        </div>
      )}

      {/* Global CSS for animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </div>
  );
}

export default AIChatbot;
