import React from 'react';
import { GitPullRequest, ArrowRight, ShieldAlert, FileCode, CheckCircle2 } from 'lucide-react';

export default function BlindspotDiffComparison() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#080B11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
            <span>The Silent Supply Chain Blindspot</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Code reviews miss what compiled binaries request.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            WebAssembly sandboxes enforce deny-by-default execution, but standard Git diffs cannot reveal when an upgraded dependency quietly adds raw socket or filesystem imports to your binary.
          </p>
        </div>

        {/* Side-by-Side Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left: What the Reviewer Sees (Source Diff) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D121D] overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
              <div className="px-5 py-3.5 bg-[#121826] border-b border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-slate-400" />
                  <span className="text-white font-medium">Pull Request #412</span>
                </div>
                <span className="text-slate-500">Cargo.lock diff</span>
              </div>

              <div className="p-5 font-mono text-xs space-y-3">
                <p className="text-slate-400 font-sans text-xs">
                  A developer bumps a utility library by a single patch version:
                </p>

                <div className="p-3.5 rounded-lg bg-[#070A10] border border-white/5 space-y-1 text-slate-300">
                  <div className="text-slate-500">[[package]]</div>
                  <div>name = "markdown_parser"</div>
                  <div className="text-rose-400/90 bg-rose-500/10 px-2 py-0.5 rounded">- version = "0.4.1"</div>
                  <div className="text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded">+ version = "0.4.2"</div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[11.5px] text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Looks harmless. Reviewer clicks "Merge".</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-white/5 bg-[#0B0F18] text-[11px] font-mono text-slate-500">
              Human Review: 0 lines of application source code modified
            </div>
          </div>

          {/* Right: What the Binary Actually Declares (Wasm Imports) */}
          <div className="rounded-2xl border border-rose-500/30 bg-[#120F16] overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
              <div className="px-5 py-3.5 bg-rose-950/30 border-b border-rose-500/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-rose-300 font-medium">
                  <FileCode className="w-4 h-4 text-rose-400" />
                  <span>Compiled plugin.wasm metadata</span>
                </div>
                <span className="text-rose-400/80 uppercase text-[10px] tracking-wider font-bold">Unseen in Git</span>
              </div>

              <div className="p-5 font-mono text-xs space-y-3">
                <p className="text-slate-300 font-sans text-xs">
                  The dependency enabled remote templates, pulling in raw network sockets:
                </p>

                <div className="p-3.5 rounded-lg bg-[#070A10] border border-rose-500/20 space-y-1 text-slate-300">
                  <div className="text-slate-500">// Declared host imports inside .wasm</div>
                  <div className="text-slate-400">import wasi:clocks/wall-clock@0.2.0;</div>
                  <div className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                    + import wasi:sockets/tcp-create-socket@0.2.0;  // ⚠️ UNAPPROVED
                  </div>
                  <div className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                    + import wasi:http/outgoing-handler@0.2.0;      // ⚠️ UNAPPROVED
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[11.5px] text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Silent privilege widening detected by wasm-diff.</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-rose-500/20 bg-rose-950/20 text-[11px] font-mono text-rose-300 flex items-center justify-between">
              <span>CI Gate Result:</span>
              <span className="font-bold">Halted with Exit Code 1</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
