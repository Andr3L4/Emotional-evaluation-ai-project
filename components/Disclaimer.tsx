
import React from 'react';

const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);


const Disclaimer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t border-yellow-300 p-3 text-center text-xs text-yellow-800 flex items-center justify-center shadow-lg">
      <AlertIcon className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>
        <strong>Disclaimer:</strong> This application is an AI simulation for entertainment purposes only and is not a substitute for professional medical advice.
      </span>
    </footer>
  );
};

export default Disclaimer;
