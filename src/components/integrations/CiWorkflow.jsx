import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export default function CiWorkflow() {
  const [activeTab, setActiveTab] = useState('action');
  const [copied, setCopied] = useState(false);

  const snippets = {
    action: {
      file: '.github/workflows/capability-gate.yml',
      code: `name: capability-gate
on:
  pull_request:
    paths: ["src/**", "Cargo.toml", "Cargo.lock", "wasm-*.json"]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build WebAssembly Component
        run: |
          rustup target add wasm32-wasip2
          cargo build --release --target wasm32-wasip2

      - name: Verify Capabilities against Baseline
        run: |
          wasm-diff verify target/wasm32-wasip2/release/plugin.wasm \\
            --baseline wasm-baseline.json \\
            --policy policy.yaml`
    },
    policy: {
      file: 'policy.yaml',
      code: `version: 1
default: warn          # Additions matching no specific rule
unclassified: fail     # Reject unknown interfaces (fail-closed)
version_changes: warn  # Warn on same-interface version upgrades

deny:
  - class: network
  - interface: "wasi:filesystem/*"

allow:
  - class: time
  - class: randomness
  - class: support

waivers:
  - interface: "wasi:http/outgoing-handler"
    component: "md-render"
    reason: "Approved in review #214: remote markdown template fetching"
    approved_by: "security-team"
    expires: 2027-01-31

on_violation: fail     # Exits with code 1 to halt pipeline`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 border-t border-white/5 bg-[#07090E]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
            Continuous Integration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Drop into your CI pipeline in seconds.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Automate capability verification across every pull request with standard YAML policies and zero runtime overhead.
          </p>
        </div>

        {/* Code Snippet Box */}
        <div className="rounded-2xl border border-white/10 bg-[#0E131F] overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 bg-[#121826]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('action')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeTab === 'action'
                    ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                GitHub Actions
              </button>
              <button
                onClick={() => setActiveTab('policy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeTab === 'policy'
                    ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                policy.yaml
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-6 font-mono text-xs overflow-x-auto bg-[#070A10]">
            <pre className="text-slate-300 leading-relaxed">
              <code>{snippets[activeTab].code}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
