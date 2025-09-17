import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-resume-analyzer-backend-y0a0.onrender.com/analyze",
        {
          resumeText,
          jobRole,
        }
      );
      setAnalysis(res.data.analysis);
    } catch (err) {
      setAnalysis("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🧠 AI Resume Analyzer</h2>

      <textarea
        rows={10}
        cols={60}
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Target Job Role (e.g., Frontend Developer)"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        style={{ marginTop: "10px", padding: "5px" }}
      />
      <br />
      <button
        onClick={analyzeResume}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {analysis && (
        <div
          style={{
            marginTop: "2rem",
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
        >
          <h3>Feedback:</h3>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}

export default App;
