import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, FileCheck, Sliders, RotateCcw } from 'lucide-react';

export default function CapabilityStudio() {
  const [denyNetwork, setDenyNetwork] = useState(true);
  const [denyFilesystem, setDenyFilesystem] = useState(true);
  const [allowTime, setAllowTime] = useState(true);
  const [activeWaiver, setActiveWaiver] = useState(false);

  // Evaluate candidate imports
  const candidateImports = [
    {
      interface: 'wasi:sockets/tcp-create-socket',
      version: '0.2.0',
      capability: 'network',
      isDenied: denyNetwork,
      isWaived: false,
      reachability: 'not-reached (dead code)'
    },
    {
      interface: 'wasi:http/outgoing-handler',
      version: '0.2.0',
      capability: 'network',
      isDenied: denyNetwork && !activeWaiver,
      isWaived: denyNetwork && activeWaiver,
      reachability: 'reachable'
    },
    {
      interface: 'wasi:filesystem/write',
      version: '0.2.0',
      capability: 'filesystem',
      isDenied: denyFilesystem,
      isWaived: false,
      reachability: 'reachable'
    },
    {
      interface: 'wasi:clocks/wall-clock',
      version: '0.2.0',
      capability: 'time',
      isDenied: !allowTime,
      isWaived: false,
      reachability: 'reachable'
    }
  ];

  const violations = candidateImports.filter((i) => i.isDenied);
  const passed = violations.length === 0;

  return (
    <section className="py-24 border-t border-white/5 bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
              Interactive Verification Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test policy rules against component diffs.
            </h2>
            <p className="text-sm text-slate-400 font-normal">
              Adjust policy rules on the left to see how the CI evaluation engine reacts in real time.
            </p>
          </div>

          <button
            onClick={() => {
              setDenyNetwork(true);
              setDenyFilesystem(true);
              setAllowTime(true);
              setActiveWaiver(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Policy</span>
          </button>
        </div>

        {/* Studio Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Panel: policy.yaml controls */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono">
                <span className="text-white font-semibold flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>policy.yaml Rules</span>
                </span>
                <span className="text-slate-500">Live Editor</span>
              </div>

              {/* Toggles */}
              <div className="space-y-3 text-xs font-mono">
                
                {/* Deny Network */}
                <div className="p-3 rounded-lg bg-[#070A10] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-300 block">deny: network</span>
                    <span className="text-slate-500 text-[11px]">Blocks sockets and HTTP</span>
                  </div>
                  <button
                    onClick={() => setDenyNetwork(!denyNetwork)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      denyNetwork
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}
                  >
                    {denyNetwork ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>

                {/* Deny Filesystem */}
                <div className="p-3 rounded-lg bg-[#070A10] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-300 block">deny: filesystem/*</span>
                    <span className="text-slate-500 text-[11px]">Blocks file read/write</span>
                  </div>
                  <button
                    onClick={() => setDenyFilesystem(!denyFilesystem)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      denyFilesystem
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}
                  >
                    {denyFilesystem ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>

                {/* Allow Time */}
                <div className="p-3 rounded-lg bg-[#070A10] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-slate-300 block">allow: time</span>
                    <span className="text-slate-500 text-[11px]">Permits clocks</span>
                  </div>
                  <button
                    onClick={() => setAllowTime(!allowTime)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      allowTime
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}
                  >
                    {allowTime ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>

                {/* Waiver Toggle */}
                <div className="p-3 rounded-lg bg-[#070A10] border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-amber-300 font-semibold block">Waiver: wasi:http</span>
                    <span className="text-slate-500 text-[11px]">Expires 2027-01-31</span>
                  </div>
                  <button
                    onClick={() => setActiveWaiver(!activeWaiver)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      activeWaiver
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}
                  >
                    {activeWaiver ? 'WAIVED' : 'OFF'}
                  </button>
                </div>

              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
              Deny rules always take precedence over allow rules.
            </div>
          </div>

          {/* Right Panel: Live Evaluation Table */}
          <div className="lg:col-span-7 p-6 rounded-2xl border border-white/10 bg-[#0E131F] space-y-5 flex flex-col justify-between shadow-xl">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Live Diff Evaluation</span>
                  <span className="text-slate-500">• candidate.wasm</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                      passed
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {passed ? '✔ CI PASSED' : `❌ ${violations.length} VIOLATION${violations.length > 1 ? 'S' : ''}`}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#070A10] border border-white/10 text-[11px] font-mono text-slate-400">
                    Exit {passed ? 0 : 1}
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 text-[11px]">
                      <th className="pb-2">Interface</th>
                      <th className="pb-2">Class</th>
                      <th className="pb-2">Verdict</th>
                      <th className="pb-2">Layer 2</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {candidateImports.map((item) => (
                      <tr key={item.interface} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 pr-2 font-semibold text-white text-[11.5px]">
                          {item.interface}
                        </td>
                        <td className="py-2.5 pr-2 text-blue-400 text-[11px]">
                          {item.capability}
                        </td>
                        <td className="py-2.5 pr-2 font-bold text-[11px]">
                          {item.isWaived ? (
                            <span className="text-amber-400">WAIVED</span>
                          ) : item.isDenied ? (
                            <span className="text-rose-400">DENIED</span>
                          ) : (
                            <span className="text-emerald-400">ALLOWED</span>
                          )}
                        </td>
                        <td className="py-2.5 text-slate-400 text-[11px]">
                          {item.reachability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explainer bar */}
            <div className="p-3 rounded-lg bg-[#070A10] border border-white/5 text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>Exit Code Semantics:</span>
              <span className={passed ? 'text-emerald-400' : 'text-rose-400'}>
                {passed
                  ? 'Exit 0: Pipeline passes and proceeds to deploy'
                  : 'Exit 1: Pipeline fails closed and blocks release'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
