import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';

export default function ProjectIntro() {
  const [copied, setCopied] = useState(false);
  const command = 'cargo install wasm-diff';

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-28 ambient-glow-blue">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>WASI 0.2 Component Gate</span>
        </div>

        {/* Clean, bold headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Detect silent privilege widening in WebAssembly components.
        </h1>

        {/* Short, sharp subheadline */}
        <p className="text-base sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
          A static analysis gate that diffs declared WASI 0.2 imports between releases. Catch unexpected network, socket, and filesystem access inside compiled binaries before deployment.
        </p>

        {/* CTAs & Quickstart */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-[#0F1420] border border-white/10 font-mono text-xs text-slate-300 w-full sm:w-auto shadow-sm">
            <span className="text-slate-500">$</span>
            <span>{command}</span>
            <button
              onClick={copyCommand}
              className="text-slate-400 hover:text-white transition-colors"
              title="Copy"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <Link
            to="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
          >
            <span>Documentation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Realistic Terminal Window */}
        <div className="pt-8 max-w-3xl mx-auto text-left">
          <div className="rounded-xl border border-white/10 bg-[#070A10] shadow-2xl overflow-hidden font-mono text-xs">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C101A] border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <span className="text-[11px] text-slate-500">wasm-diff verify</span>
              <div className="w-8" />
            </div>

            {/* Terminal Body */}
            <div className="p-5 space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-blue-400">ci-runner@github-action</span>
                <span className="text-slate-600">:</span>
                <span className="text-cyan-400">~/app</span>
                <span>$ wasm-diff verify candidate.wasm --baseline baseline.json --policy policy.yaml</span>
              </div>

              <div className="pt-1 text-slate-400">
                [1/3] Layer 1: declared imports ......... OK (baseline: 7, candidate: 10)
              </div>
              <div className="text-slate-400">
                [2/3] Layer 2: reachability analysis .... OK
              </div>

              <div className="pt-1 text-rose-400 font-semibold">
                [3/3] Policy evaluation ................. 2 VIOLATIONS DETECTED
              </div>

              <div className="pl-4 space-y-1 text-[11.5px] border-l-2 border-rose-500/40 my-2">
                <div>
                  <span className="text-rose-400 font-bold">+ wasi:sockets/tcp-create-socket</span>
                  <span className="text-slate-500 ml-2">[network]</span>
                  <span className="text-rose-400 font-semibold ml-2">DENIED</span>
                </div>
                <div>
                  <span className="text-rose-400 font-bold">+ wasi:http/outgoing-handler</span>
                  <span className="text-slate-500 ml-2">[network]</span>
                  <span className="text-rose-400 font-semibold ml-2">DENIED</span>
                </div>
                <div>
                  <span className="text-slate-400">+ wasi:io/poll</span>
                  <span className="text-slate-500 ml-2">[support]</span>
                  <span className="text-emerald-400 ml-2">ALLOWED</span>
                </div>
              </div>

              <div className="pt-1 text-rose-400 font-bold">
                RESULT: FAILED (2 unapproved capability additions, exit code 1)
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
