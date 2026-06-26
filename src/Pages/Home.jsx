import { Link } from 'react-router-dom';

export default function Home() {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  return (
    // Cream outer background — full screen centered
    <div className="min-h-screen bg-[#E8E0D5] flex items-center justify-center p-8">

      {/* Notebook wrapper — orange card + rings side by side */}
      <div className="flex items-stretch max-w-2xl w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

        {/* Rings column — left side of notebook */}
        <div className="flex flex-col justify-around items-center bg-[#E8E0D5] border-4 border-r-0 border-black px-3 py-8 rounded-l-xl">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-[#E8E0D5] border-4 border-black"
            />
          ))}
        </div>

        {/* Orange card — main content */}
        <div className="flex-1 bg-[#FF5733] border-4 border-black rounded-r-xl p-12 flex flex-col justify-between min-h-[420px]">

          {/* Date top right */}
          <div className="flex justify-end">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/60">
              {today}
            </span>
          </div>

          {/* Big hero title */}
          <div>
            <h1 className="font-black uppercase leading-none tracking-tighter text-black">
              <span className="block text-[90px]">GLOSSARY</span>
              <span className="block text-[90px]">VAULT</span>
            </h1>
          </div>

          {/* Meta lines + buttons row */}
          <div className="flex items-end justify-between gap-6">

            {/* Meta text bottom left */}
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">— YOUR TERMS</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">— YOUR KNOWLEDGE</p>
            </div>

            {/* Action buttons bottom right */}
            <div className="flex gap-3">
              <Link to="/Login">
                <button className="px-6 py-3 border-2 border-black text-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-[#FF5733] transition-all duration-200">
                  LOG IN
                </button>
              </Link>
              <Link to="/SignUp">
                <button className="px-6 py-3 bg-black text-[#FF5733] font-black uppercase tracking-widest text-xs hover:bg-[#E8E0D5] hover:text-black border-2 border-black transition-all duration-200">
                  SIGN UP
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}