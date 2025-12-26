"use client";

import { useState } from "react";
import BlurText from "@/components/BlurText";
import MagnetLines from "@/components/MagnetLines";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const askGemini = async () => {
    if (!input) return;

    setLoading(true);
    setAnswer("");

    const res = await fetch("/api/gemini", {
      method: "POST",
 headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setAnswer(data.text);
    setLoading(false);
  };

  return (
    <main style={{ padding: "40px" }}>
      {/* Blur Text */}
      <BlurText
        text="Isn't this so cool?!"
        delay={120}
        animateBy="words"
        direction="top"
      />

      {/* Magnet Lines */}
      <div style={{ margin: "40px 0" }}>
        <MagnetLines rows={7} columns={7} />
      </div>
 {/* Input */}
      <input
        type="text"
        placeholder="Ask Gemini..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "10px",
        }}
      />

      <br />

      {/* Button */}
      <button
  onClick={askGemini}
  disabled={loading}
  style={{
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  {loading ? "Loading..." : "Ask Gemini"}
</button>

      {/* Output */}
      {answer && (
        <div
          style={{
 marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            maxWidth: "500px",
          }}
        >
          {answer}
        </div>
      )}
    </main>
  );
}
