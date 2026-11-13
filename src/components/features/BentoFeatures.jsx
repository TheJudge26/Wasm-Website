import React from 'react';
import { Shield, Layers, Clock, AlertOctagon, CheckCircle2, GitPullRequest, ArrowUpRight } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#090C12]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
            Engine Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for zero trust WebAssembly pipelines.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Deterministic static analysis that stops unreviewed privilege widening without running untrusted code.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Large (2 cols wide) */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                Layer 1 Gate
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Exact declared import extraction from binary metadata.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Inspects WASI 0.2 type, import, alias, and canonical sections directly. Never normalizes or decompiles code: interface declarations are explicit binary metadata, making detection exact and sound.
              </p>
            </div>

            {/* Visual Micro-snippet */}
            <div className="p-4 rounded-xl bg-[#070A10] border border-white/5 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-slate-500">// WASI 0.2 component world interface</div>
              <div><span className="text-purple-400">package</span> example:plugin@1.0.0;</div>
              <div><span className="text-blue-400">world</span> plugin &#123;</div>
              <div className="pl-4 text-emerald-400">+ import wasi:clocks/wall-clock@0.2.0;</div>
              <div className="pl-4 text-rose-400">+ import wasi:sockets/tcp-create-socket@0.2.0; // &lt;-- Detected in CI</div>
              <div>&#125;</div>
            </div>
          </div>

          {/* Card 2: 1 col wide */}
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold">
                Security Guarantee
              </span>
              <h3 className="text-xl font-bold text-white">
                Fail-closed by design.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Corrupted binaries, unknown interface patterns, or missing baselines immediately halt the pipeline. A gate that passes without a baseline would be fail-open.
              </p>
            </div>

            {/* Exit codes pills */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#070A10] border border-white/5">
                <span className="text-slate-400">Policy satisfied</span>
                <span className="text-emerald-400 font-bold">Exit 0</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#070A10] border border-white/5">
                <span className="text-slate-400">Capability violation</span>
                <span className="text-rose-400 font-bold">Exit 1</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#070A10] border border-white/5">
                <span className="text-slate-400">Input error / Missing baseline</span>
                <span className="text-amber-400 font-bold">Exit 2</span>
              </div>
            </div>
          </div>

          {/* Card 3: 1 col wide */}
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                Layer 2 Context
              </span>
              <h3 className="text-xl font-bold text-white">
                The Non-Suppression Rule.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Layer 2 builds a conservative call graph to spot dead imports, but it can <strong>never override Layer 1</strong>. Approximate call graph analysis can never create a security hole.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070A10] border border-white/5 text-xs text-cyan-300 font-mono space-y-1">
              <div>Layer 2: not-reached</div>
              <div className="text-slate-500 text-[11px]">↳ Informational only (build still fails)</div>
            </div>
          </div>

          {/* Card 4: 2 cols wide */}
          <div className="md:col-span-2 p-8 rounded-2xl border border-white/10 bg-[#0E131F] space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                Policy Governance
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Auditable, time-limited waivers with expiration dates.
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                When a capability is legitimately required, developers don't disable the security check. They record a formal waiver in YAML with a rationale, authorized approver, and expiration date.
              </p>
            </div>

            {/* Waiver Visual */}
            <div className="p-4 rounded-xl bg-[#070A10] border border-white/5 font-mono text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-amber-400 font-semibold">wasi:http/outgoing-handler</span>
                <span className="text-slate-500 block text-[11px]">Approved in review #214: remote templates</span>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]">
                  Expires: 2027-01-31
                </span>
                <span className="text-slate-500 block text-[11px]">Approver: @security-team</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
