import React, { useState } from 'react';
import axios from 'axios';
import { 
  AlertCircle, 
  CheckCircle2, 
  ClipboardList, 
  FileSearch, 
  HelpCircle, 
  Layers, 
  Loader2, 
  Trophy, 
  UserCircle 
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/analyze';

function App() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeTranscript = async () => {
    if (!transcript.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await axios.post(API_URL, { transcript });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to connect to the server. Make sure the backend and Ollama are running.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 7) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (score >= 4) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-rose-600 border-rose-200 bg-rose-50';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FileSearch className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Trinethra</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5" />
            AI Draft — Human Review Required
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              Supervisor Feedback Transcript
            </h2>
            <p className="text-sm text-slate-500 mt-1">Paste the interview or call transcript below for analysis.</p>
          </div>
          <div className="p-6">
            <textarea
              className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
              placeholder="Enter feedback transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={analyzeTranscript}
                disabled={loading || !transcript.trim()}
                className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-md ${
                  loading || !transcript.trim() 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing with Phi-3...
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5" />
                    Run Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-8 flex items-start gap-3 text-rose-800">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Analysis Failed</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Card */}
            <div className={`rounded-2xl border-2 p-8 ${getScoreColor(result.score.value)}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-widest">{result.score.band}</span>
                  </div>
                  <h3 className="text-4xl font-black mb-2">{result.score.label}</h3>
                  <p className="text-slate-700 max-w-2xl leading-relaxed">{result.score.justification}</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-sm border border-inherit min-w-[140px]">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Score</span>
                  <span className="text-6xl font-black text-slate-800">{result.score.value}</span>
                  <span className="text-xs font-bold text-slate-400">out of 10</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Evidence */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 px-1">
                  <ClipboardList className="w-5 h-5 text-indigo-600" />
                  Key Evidence
                </h3>
                <div className="space-y-4">
                  {result.evidence.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        {item.signal === 'positive' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="space-y-2">
                          <p className="italic text-slate-700 font-medium">"{item.quote}"</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                              {item.dimension}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            {item.interpretation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="space-y-8">
                {/* KPI Mapping */}
                <section className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 px-1">
                    <Trophy className="w-5 h-5 text-indigo-600" />
                    KPI Alignment
                  </h3>
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">KPI</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Impact Evidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.kpiMapping.map((kpi, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-bold text-slate-700">{kpi.kpi}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                kpi.systemOrPersonal === 'system' 
                                  ? 'bg-indigo-100 text-indigo-700' 
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {kpi.systemOrPersonal}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{kpi.evidence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Gaps */}
                <section className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 px-1">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Identified Gaps
                  </h3>
                  <div className="space-y-3">
                    {result.gaps.map((gap, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-bold text-indigo-600 uppercase mb-1">{gap.dimension}</h4>
                        <p className="text-sm text-slate-700">{gap.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Follow-up */}
                <section className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 px-1">
                    <UserCircle className="w-5 h-5 text-indigo-600" />
                    Recommended Follow-up
                  </h3>
                  <div className="space-y-3">
                    {result.followUpQuestions.map((q, idx) => (
                      <div key={idx} className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                        <p className="font-semibold text-indigo-900 mb-2 leading-tight">{q.question}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-400 uppercase">Goal:</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{q.lookingFor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
