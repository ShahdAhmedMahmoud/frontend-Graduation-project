

"use client";

import { useState, useRef, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const FASTAPI_BASE = process.env.NEXT_PUBLIC_TA_API_URL || "http://localhost:9000/api/TA";
const MAX_QUESTIONS = 50;

// ─── Design tokens (Uni Gate palette) ────────────────────────────────────────
// Primary:    #1D4ED8  (blue)
// Secondary:  #10B981  (green)
// Accent:     #F59E0B  (amber)
// Background: #0D1B4B  (deep navy)
// Surface:    #112060  (lighter navy card)

// ─── Small reusable components ────────────────────────────────────────────────

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap
        ${active
          ? "bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/40"
          : "text-blue-300 hover:text-white hover:bg-white/5"
        }
      `}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#112060] border border-blue-900/40 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function PrimaryBtn({ onClick, disabled, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2.5 bg-[#1D4ED8] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed
        text-white text-sm font-semibold rounded-xl transition-all duration-200
        shadow-md shadow-blue-900/30 hover:shadow-blue-700/40 active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ onClick, disabled, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2.5 border border-blue-700/50 hover:border-blue-500 disabled:opacity-40
        text-blue-300 hover:text-white text-sm font-semibold rounded-xl
        transition-all duration-200 active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function StatusBox({ text, className = "" }) {
  if (!text) return null;
  const isError = text.startsWith("❌");
  return (
    <div className={`
      rounded-xl px-4 py-3 text-sm font-medium border
      ${isError
        ? "bg-red-950/40 border-red-800/40 text-red-300"
        : "bg-[#0D1B4B] border-blue-900/30 text-blue-200"
      }
      ${className}
    `}>
      <pre className="whitespace-pre-wrap font-sans">{text}</pre>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-blue-400 uppercase tracking-widest">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          bg-[#0D1B4B] border border-blue-900/40 rounded-xl px-4 py-2.5
          text-sm text-white placeholder-blue-800 focus:outline-none
          focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-900/30 transition
        "
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 3, readOnly = false, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-xs font-semibold text-blue-400 uppercase tracking-widest">{label}</label>}
      <textarea
        rows={rows}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="
          bg-[#0D1B4B] border border-blue-900/40 rounded-xl px-4 py-3
          text-sm text-blue-100 placeholder-blue-800 focus:outline-none
          focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-900/30
          transition resize-none font-sans leading-relaxed
        "
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-blue-400 uppercase tracking-widest">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="
          bg-[#0D1B4B] border border-blue-900/40 rounded-xl px-4 py-2.5
          text-sm text-white focus:outline-none focus:border-[#1D4ED8]
          focus:ring-2 focus:ring-blue-900/30 transition cursor-pointer
        "
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.12em] mb-2">{children}</p>
  );
}

function Divider() {
  return <div className="border-t border-blue-900/30 my-6" />;
}

// ─── Tab 1: Document Upload ───────────────────────────────────────────────────

function DocumentUploadTab({ projectId, setProjectId, setCleanTextPath }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleUpload = async () => {
    if (!file || !projectId.trim()) {
      setStatus("❌  File and Project ID are required.");
      return;
    }
    setLoading(true);
    setStatus("Uploading and processing…");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("project_id", projectId);
      const res = await fetch(`${FASTAPI_BASE}/fileProcessing`, { method: "POST", body: form });
      const j = await res.json();
      if (res.ok) {
        setCleanTextPath(j.text_file);
        setStatus(
          `✅  File processed successfully!\n\n  Thread ID     →  ${j.thread_id}\n  Uploaded File →  ${j.uploaded_file}\n  Extracted to  →  ${j.text_file}\n\n  Document parsed and saved as clean text.\n  You can now use any feature below.`
        );
      } else {
        setStatus(`❌  Error ${res.status}: ${j.detail || res.statusText}`);
      }
    } catch (e) {
      setStatus(`❌  ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base font-bold text-white mb-1">Upload your document</h3>
        <p className="text-sm text-blue-400 mb-5">Supported: PDF, TXT, DOCX, MP3, WAV, M4A</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            className="
              border-2 border-dashed border-blue-800/50 hover:border-[#1D4ED8]
              rounded-2xl p-8 flex flex-col items-center justify-center gap-3
              cursor-pointer transition-all duration-200 group min-h-[160px]
              bg-[#0D1B4B]/50 hover:bg-[#0D1B4B]
            "
          >
            <div className="w-12 h-12 rounded-full bg-blue-900/40 flex items-center justify-center group-hover:bg-[#1D4ED8]/20 transition">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-300 group-hover:text-white transition">
                {file ? file.name : "Drop file here or click to browse"}
              </p>
              {file && <p className="text-xs text-blue-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>}
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.txt,.docx,.mp3,.wav,.m4a"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* Project ID */}
          <div className="flex flex-col gap-4 justify-center">
            <InputField
              label="Project ID"
              value={projectId}
              onChange={setProjectId}
              placeholder="e.g. biology-101 or nlp-lecture-3"
            />
            <PrimaryBtn onClick={handleUpload} disabled={loading}>
              {loading ? "Processing…" : "⬆️  Upload & Process"}
            </PrimaryBtn>
          </div>
        </div>

        <StatusBox text={status} />
      </Card>
    </div>
  );
}

// ─── Tab 2: Question Generation ───────────────────────────────────────────────

function QuestionGenTab({ projectId, cleanTextPath }) {
  const [qType, setQType] = useState("MCQ");
  const [output, setOutput] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [continueOutput, setContinueOutput] = useState("");
  const [contLoading, setContLoading] = useState(false);

  const formatQ = (j) => {
    const q = j.graph_response || {};
    const opts = Array.isArray(q.options) ? q.options.map(o => `  ${o}`).join("\n") : (q.options || "—");
    return `❓  ${q.question}\n\n${"─".repeat(50)}\n\n${opts}\n\n${"─".repeat(50)}\n\n✅  Correct Answer:  ${q.answer}\n\n💡  Explanation:  ${q.explanation}`;
  };

  const generate = async () => {
    if (!cleanTextPath) { setOutput("❌  Upload and process a file first."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${FASTAPI_BASE}/start_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, question_type: qType, clean_text_file_path: cleanTextPath }),
      });
      const j = await res.json();
      if (res.ok) { setOutput(formatQ(j)); setThreadId(j.thread_id); }
      else setOutput(`❌  Error ${res.status}: ${j.detail}`);
    } catch (e) { setOutput(`❌  ${e.message}`); }
    finally { setLoading(false); }
  };

  const continueGen = async () => {
    if (!threadId || !cleanTextPath) { setContinueOutput("❌  Start a session first."); return; }
    setContLoading(true);
    try {
      const res = await fetch(`${FASTAPI_BASE}/continue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, thread_id: threadId, user_feedback: feedback, question_type: qType, clean_text_file_path: cleanTextPath }),
      });
      const j = await res.json();
      if (res.ok) { setContinueOutput(formatQ(j)); setThreadId(j.thread_id); }
      else setContinueOutput(`❌  Error ${res.status}: ${j.detail}`);
    } catch (e) { setContinueOutput(`❌  ${e.message}`); }
    finally { setContLoading(false); }
  };

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base font-bold text-white mb-1">Iterative Question Generation</h3>
        <p className="text-sm text-blue-400 mb-5">
          Generate one question at a time. Type <span className="text-[#F59E0B] font-semibold">auto</span> for AI self-improvement or <span className="text-[#10B981] font-semibold">save</span> to finish.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <SelectField label="Question Type" value={qType} onChange={setQType} options={["MCQ", "T/F"]} />
          <div className="flex items-end">
            <PrimaryBtn onClick={generate} disabled={loading} className="w-full sm:w-auto">
              {loading ? "Generating…" : "🎯  Generate Question"}
            </PrimaryBtn>
          </div>
        </div>

        {output && (
          <div className="bg-[#0D1B4B] border border-blue-900/30 rounded-xl px-4 py-4 mt-2">
            <pre className="whitespace-pre-wrap text-sm text-blue-100 font-sans leading-relaxed">{output}</pre>
          </div>
        )}
      </Card>

      {threadId && (
        <Card>
          <h4 className="text-sm font-bold text-blue-300 mb-4">💬  Refine this question</h4>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <InputField
              value={feedback}
              onChange={setFeedback}
              placeholder="Your feedback, 'auto' to auto-improve, or 'save' to end"
              className="flex-1"
            />
            <div className="flex items-end">
              <SecondaryBtn onClick={continueGen} disabled={contLoading}>
                {contLoading ? "Applying…" : "🔄  Apply"}
              </SecondaryBtn>
            </div>
          </div>
          {continueOutput && (
            <div className="bg-[#0D1B4B] border border-blue-900/30 rounded-xl px-4 py-4">
              <pre className="whitespace-pre-wrap text-sm text-blue-100 font-sans leading-relaxed">{continueOutput}</pre>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── Tab 3: Exam Mode ─────────────────────────────────────────────────────────

function ExamModeTab({ projectId, cleanTextPath }) {
  const [qType, setQType] = useState("MCQ");
  const [numQ, setNumQ] = useState(5);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");
  const [questions, setQuestions] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [fbLoading, setFbLoading] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState("");

  const badge = (l) => ({ easy: "🟢 Easy", medium: "🟡 Medium", hard: "🔴 Hard" }[l?.toLowerCase()] || l);

  const previewText = (qs) => qs.map((q, i) => `Q${i + 1} · ${badge(q.complexity)} · ${q.question_type}\n${q.question}\n${(q.options || []).join(" | ")}`).join("\n\n");

  const generate = async () => {
    if (!cleanTextPath) { setStatus("❌  Upload a file first."); return; }
    setLoading(true); setExamStarted(false); setResults(""); setAnswers({});
    try {
      const res = await fetch(`${FASTAPI_BASE}/start_bulk_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, question_type: qType, num_questions: numQ, clean_text_file_path: cleanTextPath }),
      });
      const j = await res.json();
      if (res.ok) { setQuestions(j.questions || []); setThreadId(j.thread_id); setStatus(`✅  ${j.questions?.length} questions generated`); setPreview(previewText(j.questions || [])); }
      else setStatus(`❌  Error ${res.status}`);
    } catch (e) { setStatus(`❌  ${e.message}`); }
    finally { setLoading(false); }
  };

  const applyFeedback = async () => {
    if (!threadId) return;
    setFbLoading(true);
    try {
      const res = await fetch(`${FASTAPI_BASE}/bulk_continue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread_id: threadId, user_feedback: feedback }),
      });
      const j = await res.json();
      if (res.ok) { setQuestions(j.questions || []); setStatus(`✅  Updated — ${j.questions?.length} questions`); setPreview(previewText(j.questions || [])); }
      else setStatus(`❌  Error ${res.status}`);
    } catch (e) { setStatus(`❌  ${e.message}`); }
    finally { setFbLoading(false); }
  };

  const scoreExam = () => {
    let correct = 0;
    const lines = ["## 📊 Exam Results\n"];
    questions.forEach((q, i) => {
      const ua = answers[i] || "";
      const isCorrect = ua.trim().toUpperCase() === q.answer?.toUpperCase();
      if (isCorrect) correct++;
      const icon = isCorrect ? "✅" : "❌";
      lines.push(`**${icon} Q${i + 1} · ${badge(q.complexity)} · ${q.question_type}**\n${q.question}`);
      if (!isCorrect) lines.push(`Your answer: ${ua || "(none)"}  |  Correct: ${q.answer}`);
      lines.push(`Explanation: ${q.explanation}\n`);
    });
    const pct = Math.round((correct / questions.length) * 100);
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "👍" : pct >= 50 ? "📚" : "💪";
    setResults(`${emoji} Score: ${correct}/${questions.length} (${pct}%)\n\n` + lines.join("\n"));
  };

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base font-bold text-white mb-1">AI-Generated Exam</h3>
        <p className="text-sm text-blue-400 mb-5">Configure, generate, refine, then take the exam.</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-end">
          <SelectField label="Question Type" value={qType} onChange={setQType} options={["MCQ", "T/F", "Both"]} />
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Number of Questions: <span className="text-white">{numQ}</span>
            </label>
            <input type="range" min={1} max={50} value={numQ} onChange={e => setNumQ(+e.target.value)}
              className="accent-[#1D4ED8] w-full cursor-pointer" />
          </div>
          <PrimaryBtn onClick={generate} disabled={loading}>
            {loading ? "Generating…" : "🎲  Generate"}
          </PrimaryBtn>
        </div>

        <StatusBox text={status} />

        {preview && (
          <div className="mt-4 bg-[#0D1B4B] border border-[#F59E0B]/20 rounded-xl px-4 py-4">
            <SectionLabel>📋 Questions Preview</SectionLabel>
            <pre className="whitespace-pre-wrap text-sm text-blue-200 font-mono leading-relaxed">{preview}</pre>
          </div>
        )}
      </Card>

      {questions.length > 0 && !examStarted && (
        <Card>
          <h4 className="text-sm font-bold text-blue-300 mb-4">💬  Refine the questions</h4>
          <div className="flex gap-3">
            <InputField value={feedback} onChange={setFeedback} placeholder="e.g. 'Make hard questions harder' or 'Focus on chapter 2'" className="flex-1" />
            <div className="flex items-end">
              <SecondaryBtn onClick={applyFeedback} disabled={fbLoading}>{fbLoading ? "Applying…" : "🔄  Regenerate"}</SecondaryBtn>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryBtn onClick={() => setExamStarted(true)} className="w-full">🚀  Start Exam</PrimaryBtn>
          </div>
        </Card>
      )}

      {examStarted && !results && (
        <Card>
          <h4 className="text-base font-bold text-white mb-5">📝  Answer all questions</h4>
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div key={i} className="bg-[#0D1B4B] rounded-xl p-4 border border-blue-900/30">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-bold text-[#1D4ED8] bg-blue-950 px-2 py-1 rounded-lg whitespace-nowrap">Q{i + 1}</span>
                  <div>
                    <span className="text-xs text-[#F59E0B] font-semibold mr-2">{badge(q.complexity)}</span>
                    <span className="text-xs text-blue-500">{q.question_type}</span>
                    <p className="text-sm text-white mt-1 leading-relaxed">{q.question}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-7">
                  {(q.options || ["True", "False"]).map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => setAnswers(prev => ({ ...prev, [i]: opt }))}
                        className="accent-[#1D4ED8] w-4 h-4"
                      />
                      <span className="text-sm text-blue-200 group-hover:text-white transition">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <PrimaryBtn onClick={scoreExam} className="w-full">✅  Submit & See Results</PrimaryBtn>
          </div>
        </Card>
      )}

      {results && (
        <Card className="border-[#10B981]/20">
          <pre className="whitespace-pre-wrap text-sm text-blue-100 font-sans leading-relaxed">{results}</pre>
          <div className="mt-4">
            <SecondaryBtn onClick={() => { setExamStarted(false); setResults(""); setAnswers({}); }}>
              🔄  Retake / New Exam
            </SecondaryBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Tab 4: Q&A ───────────────────────────────────────────────────────────────

function QATab({ cleanTextPath }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followup, setFollowup] = useState("");
  const [followupAns, setFollowupAns] = useState("");
  const [fuLoading, setFuLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const streamResponse = async (url, payload, setter, setTid) => {
    console.log("=== streamResponse START ===");
    console.log("URL:", url);
    console.log("PAYLOAD:", payload);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE STATUS:", res.status, res.statusText);
    console.log("RESPONSE HEADERS Content-Type:", res.headers.get("content-type"));

    if (!res.ok) {
      // مهم: لو فيه error من السيرفر، الـ body بيكون JSON عادي مش stream
      let errText = "";
      try { errText = await res.text(); } catch {}
      console.log("ERROR BODY:", errText);
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    if (!res.body) {
      console.log("NO res.body — streaming غير متاح في هذا المتصفح أو الرد ليس stream");
      throw new Error("No response body to stream.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let totalChunks = 0;
    let totalLines = 0;
    let totalTokens = 0;
    setter("");

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log(`=== STREAM DONE. chunks=${totalChunks} lines=${totalLines} tokens=${totalTokens} ===`);
        break;
      }
      totalChunks++;
      const chunkText = decoder.decode(value, { stream: true });
      console.log(`CHUNK #${totalChunks}:`, JSON.stringify(chunkText));

      buf += chunkText;
      const lines = buf.split("\n");
      buf = lines.pop();

      for (const rawLine of lines) {
        const line = rawLine.replace(/\r$/, ""); // إزالة \r المحتمل لو فيه CRLF
        if (line.trim() === "") continue;
        totalLines++;
        console.log(`  LINE #${totalLines}:`, JSON.stringify(line));

        if (!line.startsWith("data: ") && !line.startsWith("data:")) {
          console.log("  -> سطر متجاهل (لا يبدأ بـ data:):", line);
          continue;
        }

        const jsonPart = line.startsWith("data: ") ? line.slice(6) : line.slice(5);

        try {
          const d = JSON.parse(jsonPart);
          console.log("  -> PARSED OK:", d);
          if (setTid && d.thread_id) setTid(d.thread_id);
          if (d.event === "token") {
            totalTokens++;
            setter(prev => prev + (d.token || ""));
          }
          if (d.event === "error") {
            const friendly = d.error_type === "RateLimitError"
              ? "❌  تم تجاوز الحد المسموح به من طلبات الذكاء الاصطناعي (Rate Limit). حاول بعد دقيقة."
              : `❌  حصل خطأ: ${d.error_type || "Unknown"}`;
            setter(friendly);
          }
        } catch (err) {
          console.log("  -> JSON PARSE FAILED:", err.message, "RAW:", JSON.stringify(jsonPart));
        }
      }
    }
  };

  const ask = async () => {
    if (!cleanTextPath) { setAnswer("❌  Upload a file first."); return; }
    setLoading(true);
    setDebugInfo("شغّل الـ Console (F12) وشوف اللوجات وقت الضغط على Ask");
    try {
      await streamResponse(`${FASTAPI_BASE}/start_QA_session`, { clean_text_file_path: cleanTextPath, user_question: question }, setAnswer, setThreadId);
    } catch (e) {
      console.log("ASK ERROR:", e);
      setAnswer(`❌  ${e.message}`);
    } finally { setLoading(false); }
  };

  const askFollowup = async () => {
    if (!threadId) { setFollowupAns("❌  Ask a question first."); return; }
    setFuLoading(true);
    try {
      await streamResponse(`${FASTAPI_BASE}/QA_continue`, { user_question: followup, thread_id: threadId }, setFollowupAns, null);
    } catch (e) {
      console.log("FOLLOWUP ERROR:", e);
      setFollowupAns(`❌  ${e.message}`);
    } finally { setFuLoading(false); }
  };

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base font-bold text-white mb-1">Document Q&A</h3>
        <p className="text-sm text-blue-400 mb-5">Ask anything about your document. Answers are strictly from the document content.</p>

        <TextareaField label="Your Question" value={question} onChange={setQuestion} placeholder="What does the document say about…?" rows={2} className="mb-3" />
        <PrimaryBtn onClick={ask} disabled={loading}>{loading ? "Thinking…" : "🔍  Ask"}</PrimaryBtn>

        {debugInfo && <p className="text-xs text-amber-400 mt-2">🛠 {debugInfo}</p>}

        {answer && (
          <div className="mt-4 bg-[#0D1B4B] border border-[#10B981]/20 rounded-xl px-4 py-4">
            <SectionLabel>💬 Answer</SectionLabel>
            <p className="text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </Card>

      {threadId && (
        <Card>
          <h4 className="text-sm font-bold text-blue-300 mb-4">💬  Follow-up questions</h4>
          <div className="flex gap-3 mb-3">
            <TextareaField value={followup} onChange={setFollowup} placeholder="Continue the conversation…" rows={2} className="flex-1" />
            <div className="flex items-end">
              <SecondaryBtn onClick={askFollowup} disabled={fuLoading}>{fuLoading ? "…" : "🔍  Ask"}</SecondaryBtn>
            </div>
          </div>
          {followupAns && (
            <div className="bg-[#0D1B4B] border border-[#10B981]/20 rounded-xl px-4 py-4">
              <p className="text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">{followupAns}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── Tab 5: Summarize ─────────────────────────────────────────────────────────

function SummarizeTab({ projectId, cleanTextPath }) {
  const [depth, setDepth] = useState("standard");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [keyTerms, setKeyTerms] = useState("");
  const [tldr, setTldr] = useState("");
  const [notes, setNotes] = useState("");
  const [para, setPara] = useState("");
  const [feedback, setFeedback] = useState("");
  const [fbLoading, setFbLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const parseKeyTerms = (raw) => {
    try {
      let t = raw.trim();
      if (!t || t === "[") return "";
      if (t.endsWith(",")) t = t.slice(0, -1);
      if (!t.endsWith("]")) t += "]";
      const terms = JSON.parse(t);
      return terms.filter(x => x.term && x.definition).map(x => `**${x.term}**\n${x.definition}`).join("\n\n---\n\n");
    } catch { return raw; }
  };

  // دالة مشتركة لقراءة الـ stream فيها logging كامل لكل خطوة
  const consumeStream = async (res, onParsed) => {
    console.log("RESPONSE STATUS:", res.status, res.statusText);
    console.log("RESPONSE Content-Type:", res.headers.get("content-type"));

    if (!res.ok) {
      let errText = "";
      try { errText = await res.text(); } catch {}
      console.log("ERROR BODY:", errText);
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    if (!res.body) {
      console.log("NO res.body — الرد مش stream");
      throw new Error("No response body to stream.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let totalChunks = 0, totalLines = 0;

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log(`=== STREAM DONE. chunks=${totalChunks} lines=${totalLines} ===`);
        break;
      }
      totalChunks++;
      const chunkText = decoder.decode(value, { stream: true });
      console.log(`CHUNK #${totalChunks}:`, JSON.stringify(chunkText));

      buf += chunkText;
      const lines = buf.split("\n");
      buf = lines.pop();

      for (const rawLine of lines) {
        const line = rawLine.replace(/\r$/, "");
        if (line.trim() === "") continue;
        totalLines++;
        console.log(`  LINE #${totalLines}:`, JSON.stringify(line));

        if (!line.startsWith("data: ") && !line.startsWith("data:")) {
          console.log("  -> سطر متجاهل (لا يبدأ بـ data:):", line);
          continue;
        }
        const jsonPart = line.startsWith("data: ") ? line.slice(6) : line.slice(5);

        try {
          const d = JSON.parse(jsonPart);
          console.log("  -> PARSED OK:", d);
          onParsed(d);
        } catch (err) {
          console.log("  -> JSON PARSE FAILED:", err.message, "RAW:", JSON.stringify(jsonPart));
        }
      }
    }
  };

  const summarize = async () => {
    if (!cleanTextPath) { setTldr("❌  Upload a file first."); return; }
    setLoading(true);
    setDebugInfo("شغّل الـ Console (F12) وشوف اللوجات وقت الضغط على Generate Summary");
    setKeyTerms(""); setTldr(""); setNotes(""); setPara("");
    let ktBuf = "", tldrBuf = "", notesBuf = "", paraBuf = "";
    try {
      const res = await fetch(`${FASTAPI_BASE}/start_SG_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clean_text_file_path: cleanTextPath, project_id: projectId, depth }),
      });

      await consumeStream(res, (d) => {
        if (d.event === "session_start" && d.thread_id) setThreadId(d.thread_id);
        if (d.event === "token") {
          const s = d.section; const tok = d.token || "";
          if (s === "key_terms")         { ktBuf += tok;    setKeyTerms(parseKeyTerms(ktBuf)); }
          if (s === "tldr")              { tldrBuf += tok;  setTldr(tldrBuf); }
          if (s === "structured_notes")  { notesBuf += tok; setNotes(notesBuf); }
          if (s === "paragraph_summary" || s === "rewriter") { paraBuf += tok; setPara(paraBuf); }
        }
        if (d.event === "error") {
          const friendly = d.error_type === "RateLimitError"
            ? "❌  تم تجاوز الحد المسموح به من طلبات الذكاء الاصطناعي (Rate Limit). حاول بعد دقيقة."
            : `❌  حصل خطأ: ${d.error_type || "Unknown"}`;
          setTldr(friendly);
        }
      });
    } catch (e) {
      console.log("SUMMARIZE ERROR:", e);
      setTldr(`❌  ${e.message}`);
    } finally { setLoading(false); }
  };

  const applyFeedback = async () => {
    if (!threadId) return;
    setFbLoading(true);
    setKeyTerms(""); setTldr(""); setNotes(""); setPara("");
    let ktBuf = "", tldrBuf = "", notesBuf = "", paraBuf = "";
    try {
      const res = await fetch(`${FASTAPI_BASE}/SG_continue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: projectId, clean_text_file_path: cleanTextPath, thread_id: threadId, user_feedback: feedback }),
      });

      await consumeStream(res, (d) => {
        if (d.event === "token") {
          const s = d.section; const tok = d.token || "";
          if (s === "key_terms")         { ktBuf += tok;    setKeyTerms(parseKeyTerms(ktBuf)); }
          if (s === "tldr")              { tldrBuf += tok;  setTldr(tldrBuf); }
          if (s === "structured_notes")  { notesBuf += tok; setNotes(notesBuf); }
          if (s === "paragraph_summary" || s === "rewriter") { paraBuf += tok; setPara(paraBuf); }
        }
        if (d.event === "error") {
          const friendly = d.error_type === "RateLimitError"
            ? "❌  تم تجاوز الحد المسموح به من طلبات الذكاء الاصطناعي (Rate Limit). حاول بعد دقيقة."
            : `❌  حصل خطأ: ${d.error_type || "Unknown"}`;
          setTldr(friendly);
        }
      });
    } catch (e) {
      console.log("APPLY FEEDBACK ERROR:", e);
      setTldr(`❌  ${e.message}`);
    } finally { setFbLoading(false); }
  };

  const SummaryPanel = ({ label, content, borderColor = "border-blue-900/30", placeholder }) => (
    <div className={`bg-[#0D1B4B] border ${borderColor} rounded-xl px-4 py-4`}>
      <SectionLabel>{label}</SectionLabel>
      {content
        ? <p className="text-sm text-blue-100 leading-relaxed whitespace-pre-wrap">{content}</p>
        : <p className="text-sm text-blue-700 italic">{placeholder}</p>
      }
    </div>
  );

  return (
    <div className="space-y-5">
      <Card>
        <h3 className="text-base font-bold text-white mb-1">AI Study Summary Generator</h3>
        <p className="text-sm text-blue-400 mb-5">Generates four study artefacts in one pass: Key Terms, TL;DR, Structured Notes, and a Paragraph Guide.</p>

        <div className="flex flex-col sm:flex-row gap-4 items-end mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Summary Depth</label>
            <div className="flex gap-2">
              {["brief", "standard", "detailed"].map(d => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all capitalize
                    ${depth === d ? "bg-[#1D4ED8] text-white" : "border border-blue-800/40 text-blue-400 hover:text-white hover:border-blue-600"}`}
                >{d}</button>
              ))}
            </div>
          </div>
          <PrimaryBtn onClick={summarize} disabled={loading}>
            {loading ? "Generating…" : "✨  Generate Summary"}
          </PrimaryBtn>
        </div>

        {debugInfo && <p className="text-xs text-amber-400 mb-3">🛠 {debugInfo}</p>}

        <div className="space-y-4">
          <SummaryPanel label="⚡ Quick Recap (TL;DR)" content={tldr} borderColor="border-[#10B981]/20" placeholder="Quick recap will appear here after generation…" />
          <SummaryPanel label="🔑 Key Terms & Definitions" content={keyTerms} borderColor="border-[#1D4ED8]/30" placeholder="Key terms will appear here after generation…" />
          <SummaryPanel label="📋 Structured Notes" content={notes} borderColor="border-blue-900/30" placeholder="Structured notes will appear here after generation…" />
          <SummaryPanel label="📖 Paragraph Study Guide" content={para} borderColor="border-[#F59E0B]/20" placeholder="Paragraph summary will appear here after generation…" />
        </div>
      </Card>

      {threadId && (
        <Card>
          <h4 className="text-sm font-bold text-blue-300 mb-4">💬  Refine your summary</h4>
          <p className="text-xs text-blue-500 mb-3">Type <span className="text-[#F59E0B]">auto</span> to auto-improve or <span className="text-[#10B981]">save</span> to finish.</p>
          <div className="flex gap-3">
            <TextareaField value={feedback} onChange={setFeedback} placeholder="e.g. 'Add more examples to the structured notes' or 'auto'" rows={2} className="flex-1" />
            <div className="flex items-end">
              <SecondaryBtn onClick={applyFeedback} disabled={fbLoading}>{fbLoading ? "Applying…" : "🔄  Apply"}</SecondaryBtn>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "upload",   label: "📄  Document" },
  { id: "qgen",     label: "✏️  Question Gen" },
  { id: "exam",     label: "📝  Exam Mode" },
  { id: "qa",       label: "🗨️  Q&A" },
  { id: "summarize",label: "📚  Summarize" },
];

export default function TeachingAssistantPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [projectId, setProjectId] = useState("");
  const [cleanTextPath, setCleanTextPath] = useState(null);

  return (
    <div className="min-h-screen bg-[#0D1B4B] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-900/40">
              <span className="text-lg">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Teaching Assistant</h1>
              <p className="text-sm text-blue-400">AI-powered study companion — upload once, learn smarter</p>
            </div>
          </div>

          {/* Status pill */}
          {cleanTextPath && (
            <div className="mt-3 inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-semibold text-[#10B981]">Document ready · {projectId}</span>
            </div>
          )}
        </div>

        {/* ── Tab bar ── */}
        <div className="bg-[#0A1228] border border-blue-900/30 rounded-2xl p-1.5 flex gap-1 overflow-x-auto mb-6">
          {TABS.map(t => (
            <TabButton key={t.id} active={activeTab === t.id} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </TabButton>
          ))}
        </div>

        {/* ── Tab Content ── */}
        {activeTab === "upload"    && <DocumentUploadTab projectId={projectId} setProjectId={setProjectId} setCleanTextPath={setCleanTextPath} />}
        {activeTab === "qgen"      && <QuestionGenTab projectId={projectId} cleanTextPath={cleanTextPath} />}
        {activeTab === "exam"      && <ExamModeTab projectId={projectId} cleanTextPath={cleanTextPath} />}
        {activeTab === "qa"        && <QATab cleanTextPath={cleanTextPath} />}
        {activeTab === "summarize" && <SummarizeTab projectId={projectId} cleanTextPath={cleanTextPath} />}

        {/* ── Footer ── */}
        <p className="text-center text-xs text-blue-900 mt-10">
          Uni Gate · Teaching Assistant · Powered by LangGraph & FastAPI
        </p>
      </div>
    </div>
  );
}

