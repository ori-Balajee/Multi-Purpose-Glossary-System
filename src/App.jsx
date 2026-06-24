import { useState, useEffect } from 'react';
import TermCard from './components/TermCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import DifficultyFilter from './components/DifficultyFilter';
import AddTermForm from './components/AddTermForm';

export default function App() {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  useEffect(() => {
    filterTerms();
  }, [terms, searchQuery, selectedCategory, selectedDifficulty]);

  const fetchTerms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/terms`);
      const data = await response.json();
      if (data.success) {
        setTerms(data.terms);
      }
    } catch (error) {
      console.log('Using sample data');
    }
  };

  const filterTerms = () => {
    let result = terms;
    
    if (searchQuery) {
      result = result.filter(term => 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(term => term.category === selectedCategory);
    }
    
    if (selectedDifficulty) {
      result = result.filter(term => term.difficulty === selectedDifficulty);
    }
    
    setFilteredTerms(result);
  };

  const handleAddTerm = async (termData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/terms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(termData)
      });
      const data = await response.json();
      if (data.success) {
        setTerms([data.term, ...terms]);
        setShowAddForm(false);
      }
    } catch (error) {
      console.log('Adding term locally');
      const newTerm = { ...termData, id: Date.now().toString(), createdAt: new Date() };
      setTerms([newTerm, ...terms]);
      setShowAddForm(false);
    }
  };

  const categories = [...new Set(terms.map(t => t.category))];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200/30">
              <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Glossary</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all"
          >
            Add Term
          </button>
        </div>
        <p className="text-slate-400 mt-2">Build terminology with a comprehensive glossary</p>
      </header>

      {/* Filters */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter 
            categories={categories} 
            value={selectedCategory} 
            onChange={setSelectedCategory} 
          />
          <DifficultyFilter 
            difficulties={difficulties} 
            value={selectedDifficulty} 
            onChange={setSelectedDifficulty} 
          />
        </div>
      </section>

      {/* Terms Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredTerms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No terms found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map(term => (
              <TermCard key={term._id || term.id} term={term} />
            ))}
          </div>
        )}
      </main>

      {/* Add Term Modal */}
      {showAddForm && (
        <AddTermForm 
          onSubmit={handleAddTerm} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
    </div>
  );
}
