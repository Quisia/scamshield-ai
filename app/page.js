"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyzeText() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>ScamShield.ai</h1>
      <p>Paste any suspicious message below and get an instant scam risk analysis.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the email, chat or message here..."
        style={{
          width: "100%",
          height: 150,
          padding: 10,
          marginTop: 20,
          fontSize: 16,
        }}
      />

      <button
        onClick={analyzeText}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            background: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <h3>Risk Score: {result.riskScore}%</h3>
          <p><strong>Risk Label:</strong> {result.riskLabel}</p>
          <p><strong>Type:</strong> {result.scamType}</p>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>

          <h4>Reasons:</h4>
          <ul>
            {result.reasons?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
