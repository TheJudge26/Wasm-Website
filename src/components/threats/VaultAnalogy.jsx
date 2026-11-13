import React from 'react';
import { Package, GitCompare, ShieldAlert } from 'lucide-react';

export default function VaultAnalogy() {
  const problems = [
    {
      icon: Package,
      title: 'Hidden in Dependencies',
      desc: 'Bumping an innocent utility crate in your lockfile can pull in network or filesystem imports without touching any of your project’s Rust, Go, or WIT source files.'
    },
    {
      icon: GitCompare,
      title: 'Invisible in Source Diffs',
      desc: 'Pull request reviewers only see a one-line version number change in Cargo.lock. The compiled WebAssembly binary silently requests new host capabilities.'
    },
    {
      icon: ShieldAlert,
      title: 'Unreviewed Production Grants',
      desc: 'Without automated pre-release capability diffing, runtime hosts either crash in production or operators blindly approve expanded permissions.'
    }
  ];

  return (
    <section id="problem" className="py-20 border-t border-slate-800/80 bg-[#0C101A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
            The Supply Chain Blindspot
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WebAssembly sandboxes are deny-by-default. But binaries can still quietly ask for more.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The runtime sandbox prevents a component from touching the outside world without permission. But it does not alert maintainers when a new release starts requesting more than the previous release did.
          </p>
        </div>

        {/* 3 Clean Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl border border-slate-800 bg-[#0F1420] space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
