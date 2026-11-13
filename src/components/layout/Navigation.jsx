import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#07090E]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Text Mark (clean, minimalist, nameless or minimal) */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-mono font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight">
              wasm-diff
            </span>
          </Link>

          {/* Desktop Navigation: Only Home, Documentation, Blog */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === '/'
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/docs"
              className={`transition-colors ${
                location.pathname === '/docs'
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Documentation
            </Link>

            <Link
              to="/blog"
              className={`transition-colors ${
                location.pathname === '/blog'
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Right Action: GitHub button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D111A] border-b border-white/10 px-4 py-4 space-y-3 text-sm">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block py-1 ${location.pathname === '/' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Home
          </Link>

          <Link
            to="/docs"
            onClick={() => setMobileOpen(false)}
            className={`block py-1 ${location.pathname === '/docs' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Documentation
          </Link>

          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className={`block py-1 ${location.pathname === '/blog' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Blog
          </Link>
        </div>
      )}
    </header>
  );
}
