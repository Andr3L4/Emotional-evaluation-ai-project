
import React from 'react';

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="w-full max-w-3xl mx-auto text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center mb-2">
        <ClipboardIcon className="h-8 w-8 text-slate-600 mr-3"/>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-wider">Psych-Eval A.I.</h1>
      </div>
      <p className="text-slate-500 font-mono text-sm tracking-widest">AUTOMATED EMOTIONAL RESONANCE ANALYSIS</p>
    </header>
  );
};

export default Header;
