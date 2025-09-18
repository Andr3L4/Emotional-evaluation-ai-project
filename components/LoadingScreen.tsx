
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Accessing patient records...",
  "Calibrating psychometric sensors...",
  "Analyzing cognitive patterns...",
  "Cross-referencing emotional schemas...",
  "Synthesizing diagnostic data...",
  "Compiling preliminary report...",
];

const LoadingScreen: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="text-center p-8">
        <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
        </div>
      <h2 className="text-xl font-bold text-slate-800">Evaluation in Progress</h2>
      <p className="text-slate-600 font-mono mt-2 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
