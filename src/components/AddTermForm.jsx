import { useState } from 'react';

export default function AddTermForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    category: '',
    difficulty: 'beginner',
    examples: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const termData = {
      ...formData,
      examples: formData.examples.split('\n').filter(e => e.trim())
    };
    onSubmit(termData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Chess Term</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Term Name</label>
            <input
              type="text"
              value={formData.term}
              onChange={(e) => setFormData({...formData, term: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Definition</label>
            <textarea
              value={formData.definition}
              onChange={(e) => setFormData({...formData, definition: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Examples (one per line)</label>
            <textarea
              value={formData.examples}
              onChange={(e) => setFormData({...formData, examples: e.target.value})}
              className="w-full px-3 py-2 bg-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows="2"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              Add Term
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-slate-700 rounded-lg font-medium hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}