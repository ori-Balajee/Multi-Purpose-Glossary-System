export default function TermCard({ term }) {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'from-emerald-500 to-teal-600',
      intermediate: 'from-amber-500 to-orange-600',
      advanced: 'from-red-500 to-pink-600'
    };
    return colors[difficulty] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur hover:bg-slate-700/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-slate-100">{term.term}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getDifficultyColor(term.difficulty)}`}>
          {term.difficulty}
        </span>
      </div>
      
      <p className="text-slate-300 mb-4">{term.definition}</p>
      
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 text-xs font-medium bg-slate-700/50 rounded-full">
          {term.category}
        </span>
        {term.examples && term.examples.length > 0 && (
          <button className="text-xs text-slate-400 hover:text-slate-300">
            Examples ({term.examples?.length || 0})
          </button>
        )}
      </div>
    </div>
  );
}