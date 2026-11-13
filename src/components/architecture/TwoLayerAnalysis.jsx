import React from 'react';
import { Layers, ShieldCheck, Check } from 'lucide-react';

export default function TwoLayerAnalysis() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#080B11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How wasm-diff works: Two-layer analysis.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Decoupling strict policy enforcement from reachability heuristics ensures that call-graph imprecisions can never create a security loophole.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Layer 1 */}
          <div className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Layer 1: Strict Policy Gate
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Exact & Sound
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                Declared Import Extraction & Policy Diff
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Extracts the component's outermost import section with wasmparser. Maps versioned interfaces to capability classes (network, filesystem, time) and diffs them against your committed baseline manifest.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 font-sans pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Deterministic SHA-256 baseline manifests.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Fail-closed: malformed inputs immediately abort.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Sole decider of CI Pass / Fail exit code.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-500">
              Output: Pass (Exit 0) or Violation (Exit 1)
            </div>
          </div>

          {/* Layer 2 */}
          <div className="p-7 sm:p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Layer 2: Reachability Analysis
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Informational Only
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white">
                Call-Graph Reachability & Dead Code Detection
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Constructs a conservative call graph from entry points. Annotates whether newly declared capabilities are actively reachable or dead code linked by third-party libraries.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 font-sans pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Identifies dead library imports to speed up triage.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Attributes capabilities back to specific exports.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span><strong>Non-Suppression Rule:</strong> Never overrides Layer 1.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-500">
              Output: Reachable or Not-Reached Annotation
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
