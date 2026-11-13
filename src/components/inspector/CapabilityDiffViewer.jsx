import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CapabilityDiffViewer() {
  const [activeScenario, setActiveScenario] = useState('leak');

  const scenarios = {
    leak: {
      id: 'leak',
      title: 'Unapproved Socket Addition',
      desc: 'Bumping markdown_parser from 0.4.1 to 0.4.2 pulled in HTTP fetching and direct TCP sockets inside the compiled binary.',
      status: 'POLICY FAILED',
      statusClass: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      exitCode: 1,
      items: [
        {
          name: 'wasi:sockets/tcp-create-socket',
          version: '0.2.0',
          class: 'network',
          verdict: 'DENIED',
          verdictClass: 'text-rose-400 font-bold',
          reachability: 'not-reached (dead code in library)'
        },
        {
          name: 'wasi:http/outgoing-handler',
          version: '0.2.0',
          class: 'network',
          verdict: 'DENIED',
          verdictClass: 'text-rose-400 font-bold',
          reachability: 'reachable from "render_markdown"'
        },
        {
          name: 'wasi:io/poll',
          version: '0.2.0',
          class: 'support',
          verdict: 'ALLOWED',
          verdictClass: 'text-emerald-400 font-semibold',
          reachability: 'reachable'
        }
      ]
    },
    waiver: {
      id: 'waiver',
      title: 'Approved Feature with Waiver',
      desc: 'Sockets were disabled, and the team registered a time-limited waiver in policy.yaml for HTTP templates.',
      status: 'POLICY PASSED (WAIVED)',
      statusClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      exitCode: 0,
      items: [
        {
          name: 'wasi:http/outgoing-handler',
          version: '0.2.0',
          class: 'network',
          verdict: 'WAIVED',
          verdictClass: 'text-amber-400 font-bold',
          reachability: 'reachable (waiver expires 2027-01-31)'
        },
        {
          name: 'wasi:io/poll',
          version: '0.2.0',
          class: 'support',
          verdict: 'ALLOWED',
          verdictClass: 'text-emerald-400 font-semibold',
          reachability: 'reachable'
        }
      ]
    },
    clean: {
      id: 'clean',
      title: 'Clean Release',
      desc: 'Internal parser logic fixes only. Zero capability changes compared to baseline manifest.',
      status: 'POLICY PASSED',
      statusClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      exitCode: 0,
      items: []
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section id="inspector" className="py-20 border-t border-slate-800/80 bg-[#0A0D14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
              Interactive Diff Inspector
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test release scenarios in real time.
            </h2>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveScenario('leak')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeScenario === 'leak'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Unapproved Leak
            </button>
            <button
              onClick={() => setActiveScenario('waiver')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeScenario === 'waiver'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Approved Waiver
            </button>
            <button
              onClick={() => setActiveScenario('clean')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeScenario === 'clean'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Clean Release
            </button>
          </div>
        </div>

        {/* The Inspector Box */}
        <div className="rounded-xl border border-slate-800 bg-[#0F1420] overflow-hidden shadow-xl">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-white font-semibold">{current.title}</span>
              <span className="text-slate-500 ml-2 hidden sm:inline">• {current.desc}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${current.statusClass}`}>
                {current.status}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                exit {current.exitCode}
              </span>
            </div>
          </div>

          {/* Table or Clean State */}
          <div className="p-5">
            {current.items.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-semibold text-white">0 Added Capabilities</div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Candidate component declares identical host imports to the approved baseline manifest. Build passes cleanly.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="pb-3 font-medium">Added Interface</th>
                      <th className="pb-3 font-medium">Class</th>
                      <th className="pb-3 font-medium">Policy Verdict</th>
                      <th className="pb-3 font-medium">Reachability Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {current.items.map((item) => (
                      <tr key={item.name} className="hover:bg-slate-900/40">
                        <td className="py-3 pr-4 font-semibold text-white">
                          {item.name}
                          <span className="text-slate-500 font-normal ml-1">@{item.version}</span>
                        </td>
                        <td className="py-3 pr-4 text-blue-400">{item.class}</td>
                        <td className={`py-3 pr-4 ${item.verdictClass}`}>{item.verdict}</td>
                        <td className="py-3 text-slate-400">{item.reachability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
