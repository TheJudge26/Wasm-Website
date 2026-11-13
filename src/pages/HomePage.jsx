import React from 'react';
import Navigation from '../components/layout/Navigation';
import ProjectIntro from '../components/overview/ProjectIntro';
import BlindspotDiffComparison from '../components/threats/BlindspotDiffComparison';
import CapabilityStudio from '../components/inspector/CapabilityStudio';
import TwoLayerAnalysis from '../components/architecture/TwoLayerAnalysis';
import CiWorkflow from '../components/integrations/CiWorkflow';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navigation />
      <main className="flex-1">
        <ProjectIntro />
        <BlindspotDiffComparison />
        <CapabilityStudio />
        <TwoLayerAnalysis />
        <CiWorkflow />
      </main>
      <Footer />
    </div>
  );
}
