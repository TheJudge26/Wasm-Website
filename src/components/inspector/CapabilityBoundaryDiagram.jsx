import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Unlock, Play, RotateCcw, AlertTriangle, ArrowRight, Zap, Check } from 'lucide-react';

export default function CapabilityBoundaryDiagram() {
  const [capabilities, setCapabilities] = useState({
    clock: { name: 'wasi:clocks/wall-clock', class: 'time', defaultAllowed: true, active: true },
    io: { name: 'wasi:io/poll', class: 'support', defaultAllowed: true, active: true },
    http: { name: 'wasi:http/outgoing-handler', class: 'network', defaultAllowed: false, active: true },
    socket: { name: 'wasi:sockets/tcp-create-socket', class: 'network', defaultAllowed: false, active: true },
    fs: { name: 'wasi:filesystem/write', class: 'filesystem', defaultAllowed: false, active: false }
  });

  const [hasWaiver, setHasWaiver] = useState(false);

  const toggleCap = (key) => {
    setCapabilities((prev) => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active }
    }));
  };

  // Determine policy result
  const activeDeniedCaps = Object.entries(capabilities).filter(([key, cap]) => {
    if (!cap.active) return false;
    if (cap.class === 'network' || cap.class === 'filesystem') {
      if (hasWaiver && cap.class === 'network' && key === 'http') return false; // waived
      return true;
    }
    return false;
  });

  const isFailed = activeDeniedCaps.length > 0;

  return (
    <div className="w-full rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Background radial glow based on pass/fail */}
      <div
        className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl transition-colors duration-500 pointer-events-none opacity-20 ${
          isFailed ? 'bg-rose-500' : hasWaiver ? 'bg-amber-500' : 'bg-emerald-500'
        }`}
      />

      {/* Diagram Header / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
              Interactive Topology Simulator
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            WASI Component Capability Boundary
          </h3>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHasWaiver(!hasWaiver)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
              hasWaiver
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {hasWaiver ? '✔ Waiver Active' : '+ Simulate Waiver'}
          </button>
          
          <button
            onClick={() => {
              setCapabilities({
                clock: { name: 'wasi:clocks/wall-clock', class: 'time', defaultAllowed: true, active: true },
                io: { name: 'wasi:io/poll', class: 'support', defaultAllowed: true, active: true },
                http: { name: 'wasi:http/outgoing-handler', class: 'network', defaultAllowed: false, active: false },
                socket: { name: 'wasi:sockets/tcp-create-socket', class: 'network', defaultAllowed: false, active: false },
                fs: { name: 'wasi:filesystem/write', class: 'filesystem', defaultAllowed: false, active: false }
              });
              setHasWaiver(false);
            }}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reset to clean baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visual Arena: 3 Connected Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-6">
        
        {/* Left Column: Host System Capabilities */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>HOST CAPABILITIES (WASI 0.2)</span>
            <span className="text-[11px] text-slate-500">CLICK TO TOGGLE</span>
          </div>

          <div className="space-y-2">
            {Object.entries(capabilities).map(([key, cap]) => {
              const isDenied = (cap.class === 'network' || cap.class === 'filesystem') && !(hasWaiver && key === 'http');
              return (
                <div
                  key={key}
                  onClick={() => toggleCap(key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    !cap.active
                      ? 'border-white/5 bg-white/[0.02] text-slate-500 opacity-60'
                      : isDenied
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 shadow-sm'
                      : hasWaiver && key === 'http'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-semibold">
                      {cap.name}
                    </div>
                    <div className="text-[11px] opacity-75 font-mono">
                      class: {cap.class}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        !cap.active
                          ? 'bg-slate-800 text-slate-500'
                          : isDenied
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : hasWaiver && key === 'http'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {cap.active ? (isDenied ? 'DENIED' : hasWaiver && key === 'http' ? 'WAIVED' : 'ALLOWED') : 'OFF'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: The Security Diff Gate (Firewall) */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 relative">
          <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent absolute" />
          
          <div
            className={`z-10 p-4 rounded-2xl border flex flex-col items-center text-center gap-2 shadow-xl backdrop-blur-md transition-all ${
              isFailed
                ? 'border-rose-500/60 bg-rose-950/80 text-rose-400'
                : hasWaiver
                ? 'border-amber-500/60 bg-amber-950/80 text-amber-400'
                : 'border-emerald-500/60 bg-emerald-950/80 text-emerald-400'
            }`}
          >
            {isFailed ? (
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            ) : (
              <ShieldCheck className="w-8 h-8" />
            )}

            <div className="font-mono text-xs font-bold uppercase tracking-wider">
              {isFailed ? 'GATE BLOCKED' : 'GATE PASSED'}
            </div>
            
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
              {isFailed ? 'Exit Code 1' : 'Exit Code 0'}
            </span>
          </div>
        </div>

        {/* Right Column: WebAssembly Component Boundary */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-white/10 bg-[#0A0D14] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="font-mono text-xs font-semibold text-white">
              Component: md-render.wasm
            </span>
            <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              wasm32-wasip2
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono text-[11px] block">Public Export:</span>
              <div className="font-mono text-slate-200">
                export run: func() -&gt; string
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 space-y-2">
              <span className="text-slate-400 font-mono text-[11px] block">
                Live Capability Evaluation:
              </span>
              
              {isFailed ? (
                <div className="space-y-1.5 text-rose-300">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{activeDeniedCaps.length} unapproved additions detected!</span>
                  </div>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    Build is failed closed. To unblock: remove dependencies or record an authorized waiver in policy.yaml.
                  </p>
                </div>
              ) : (
                <div className="space-y-1 text-emerald-300">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Policy satisfied</span>
                  </div>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">
                    {hasWaiver
                      ? 'Approved under temporary waiver (expires 2027-01-31).'
                      : 'All requested capabilities match allowed policy classes.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
