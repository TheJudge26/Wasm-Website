import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { ArrowLeft, BookOpen, GitCommit, Rss } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navigation />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-32 pb-24 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-blue-400">Blog</span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
            <Rss className="w-3.5 h-3.5" />
            <span>Engineering Blog</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Blog
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal">
            Technical notes, deep dives into WebAssembly capability security, and release announcements.
          </p>
        </div>

        {/* Empty State / Coming Soon */}
        <div className="p-10 rounded-2xl border border-white/10 bg-[#0E131F] text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
            <BookOpen className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">No articles published yet</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              We are actively developing the core capability diff engine. Articles detailing WASI 0.2 static analysis, dependency security, and release notes will be published here.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Follow on GitHub</span>
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
