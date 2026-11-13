import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import { BookOpen, Terminal, FileCode, Shield, ArrowLeft, Search, Layers, Clock } from 'lucide-react';

export default function DocsPage() {
  const sidebarNav = [
    {
      group: 'Getting Started',
      items: [
        { name: 'Introduction', active: true },
        { name: 'Installation', active: false },
        { name: 'Quickstart Guide', active: false },
      ]
    },
    {
      group: 'Core Concepts',
      items: [
        { name: 'WASI 0.2 Capabilities', active: false },
        { name: 'Baseline Manifests', active: false },
        { name: 'Two-Layer Verification', active: false },
      ]
    },
    {
      group: 'Configuration',
      items: [
        { name: 'Policy YAML Syntax', active: false },
        { name: 'Waiver Specifications', active: false },
        { name: 'Exit Codes Reference', active: false },
      ]
    },
    {
      group: 'Continuous Integration',
      items: [
        { name: 'GitHub Actions', active: false },
        { name: 'GitLab CI', active: false },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navigation />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Documentation Sidebar */}
          <aside className="lg:col-span-3 border-r border-white/5 pr-6 hidden lg:block">
            {/* Search Placeholder */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documentation..."
                disabled
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 placeholder-slate-600 focus:outline-none cursor-not-allowed"
              />
            </div>

            <nav className="space-y-6 text-xs">
              {sidebarNav.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="font-mono text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    {section.group}
                  </span>
                  <ul className="space-y-1 text-slate-400">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <span
                          className={`block px-2.5 py-1.5 rounded-md transition-colors ${
                            item.active
                              ? 'bg-blue-600/10 text-blue-400 font-medium border border-blue-500/20'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Docs Content Area (Clean Placeholder) */}
          <main className="lg:col-span-9 space-y-8">
            
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-300">Docs</span>
              <span>/</span>
              <span className="text-blue-400">Getting Started</span>
            </div>

            {/* Header */}
            <div className="space-y-4 pb-8 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Under Active Development</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Documentation
              </h1>

              <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
                Comprehensive technical guides, CLI commands, and policy schemas are being authored alongside the development of the tool.
              </p>
            </div>

            {/* Empty-State Showcase Card */}
            <div className="p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Docs are on the way</h3>
                  <p className="text-xs text-slate-400">Detailed reference material will be published here in the next milestone.</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                As the CLI and static analysis engine mature, this section will host full documentation for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-[#070A10] border border-white/5 space-y-1">
                  <span className="text-blue-400 font-semibold block">CLI Commands</span>
                  <span className="text-slate-400">Usage guides for <code className="text-slate-200">list</code>, <code className="text-slate-200">manifest</code>, <code className="text-slate-200">diff</code>, and <code className="text-slate-200">verify</code>.</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#070A10] border border-white/5 space-y-1">
                  <span className="text-blue-400 font-semibold block">Policy Syntax</span>
                  <span className="text-slate-400">Writing <code className="text-slate-200">policy.yaml</code> with allow/deny rules, unclassified behavior, and time-limited waivers.</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#070A10] border border-white/5 space-y-1">
                  <span className="text-blue-400 font-semibold block">WASI 0.2 Mapping</span>
                  <span className="text-slate-400">Interface-to-capability classifications with transitive implication rules.</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#070A10] border border-white/5 space-y-1">
                  <span className="text-blue-400 font-semibold block">CI/CD Setup</span>
                  <span className="text-slate-400">Drop-in pipeline recipes for GitHub Actions and GitLab CI.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Status: Planned for Milestone M1</span>
                <Link
                  to="/"
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Return to Home</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
