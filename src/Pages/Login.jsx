import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem('token', data.token);
      navigate('/Glossary');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E8E0D5]">

      {/* LEFT PANEL — bold orange branding side */}
      <div className="hidden md:flex w-1/2 bg-[#FF5733] flex-col justify-between p-12 border-r-4 border-black">
        {/* App name top left */}
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black">
          GLOSSARY
        </p>

        {/* Big headline bottom left */}
        <div>
          <h1 className="text-8xl font-black uppercase tracking-tighter text-black leading-none">
            SIGN
          </h1>
          <h1 className="text-8xl font-black uppercase tracking-tighter text-black leading-none">
            IN.
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-6">
            — Welcome back
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — form side */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20">

        {/* Mobile-only headline */}
        <div className="md:hidden mb-10">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-black leading-none">
            SIGN IN.
          </h1>
        </div>

        {error && (
          <div className="bg-[#FF5733] text-black px-4 py-3 rounded mb-6 text-xs font-black uppercase tracking-widest border-2 border-black">
            — {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 max-w-sm">

          {/* Email */}
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.25em] text-black mb-3">
              — Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full bg-transparent border-b-2 border-black py-3 text-black placeholder-black/30 font-medium text-sm focus:outline-none focus:border-[#FF5733] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.25em] text-black mb-3">
              — Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="w-full bg-transparent border-b-2 border-black py-3 text-black placeholder-black/30 font-medium text-sm focus:outline-none focus:border-[#FF5733] transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-[#FF5733] py-4 font-black uppercase tracking-widest text-sm hover:bg-[#FF5733] hover:text-black transition-colors border-2 border-black disabled:opacity-40"
          >
            {loading ? 'LOGGING IN...' : 'LOG IN →'}
          </button>

        </form>

        {/* Signup link */}
        <p className="text-xs font-black uppercase tracking-widest text-black/40 mt-10 max-w-sm">
          No account?{' '}
          <Link to="/signup" className="text-black underline underline-offset-4 hover:text-[#FF5733] transition-colors">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;