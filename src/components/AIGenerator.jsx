import { useState } from "react";

export default function AIGenerator({ onClose, onGenerate }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(import.meta.env.VITE_API_URL);

  const generateTerms = async () => {
    if (!topic) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/genTerms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count: 5 }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "API failed");
        return;
      }

      if (!Array.isArray(data.data)) {
        setError("Invalid response format");
        return;
      }
      
      onGenerate(data.data);
      onClose();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Dark overlay behind the modal
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      {/* Modal card */}
      <div className="bg-[#FF5733] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-sm p-10">

        {/* Title */}
        <h2 className="text-3xl font-black uppercase tracking-tighter text-black leading-none mb-8">
          AI<br />GENERATE.
        </h2>

        {/* Topic input */}
        <div className="mb-6">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black mb-3">
            — Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Animals"
            className="w-full bg-transparent border-b-2 border-black py-3 text-black placeholder-black/30 text-sm font-medium focus:outline-none"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-black text-[#FF5733] px-4 py-2 text-xs font-black uppercase tracking-widest mb-6">
            — {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={generateTerms}
            disabled={loading}
            className="flex-1 bg-black text-[#FF5733] py-3 font-black uppercase tracking-widest text-xs hover:bg-[#E8E0D5] hover:text-black border-2 border-black transition-all disabled:opacity-40"
          >
            {loading ? "GENERATING..." : "GENERATE →"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 bg-transparent text-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[#FF5733] border-2 border-black transition-all"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}