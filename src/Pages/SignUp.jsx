import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      navigate('/Glossary');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#E8E0D5]">

      {/* LEFT — form panel (flipped from Login so they feel like a pair) */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-sm">

          {/* Mobile headline */}
          <h1 className="md:hidden text-5xl font-black uppercase tracking-tighter text-black mb-12">
            SIGN UP.
          </h1>

          {/* Error */}
          {error && (
            <div className="bg-[#FF5733] text-black px-4 py-3 text-xs font-black uppercase tracking-widest border-2 border-black mb-8">
              — {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-10">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black mb-4">
                — Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border-b-2 border-black py-4 text-black placeholder-black/25 text-base font-medium focus:outline-none focus:border-[#FF5733] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="mb-12">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black mb-4">
                — Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min 6 characters"
                className="w-full bg-transparent border-b-2 border-black py-4 text-black placeholder-black/25 text-base font-medium focus:outline-none focus:border-[#FF5733] transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-[#FF5733] py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-[#FF5733] hover:text-black border-2 border-black transition-all duration-200 disabled:opacity-40"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
            </button>

          </form>

          {/* Login link */}
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-black underline underline-offset-4 hover:text-[#FF5733] transition-colors">
              Log in
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT — orange branding panel */}
      <div className="hidden md:flex bg-[#FF5733] border-l-4 border-black flex-col justify-between p-14">
        <div className="flex justify-end">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-black">GLOSSARY </span>
        </div>
        <div className="text-right">
          <p className="text-[120px] font-black uppercase leading-[0.85] tracking-tighter text-black">
            SIGN<br />UP.
          </p>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/50 mt-8">New here —</p>
        </div>
      </div>

    </div>
  );
};

export default Signup;