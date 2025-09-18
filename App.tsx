
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import LoadingScreen from './components/LoadingScreen';
import Disclaimer from './components/Disclaimer';
import { analyzeEmotionalState } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleStartEvaluation = useCallback(async (statement: string) => {
    setIsEvaluating(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeEmotionalState(statement);
      setAnalysisResult(result);
    } catch (err) {
      setError('Evaluation failed. The analysis model may be offline or an internal error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAnalysisResult(null);
    setError(null);
  }, []);

  const renderContent = () => {
    if (isEvaluating) {
      return <LoadingScreen />;
    }
    if (error) {
        return (
            <div className="w-full max-w-3xl mx-auto bg-white p-8 border border-red-300 shadow-lg mt-8 text-center">
                <h2 className="text-xl font-bold text-red-700 mb-4">An Error Occurred</h2>
                <p className="text-slate-700 mb-6">{error}</p>
                <button
                    onClick={handleReset}
                    className="bg-slate-600 text-white font-bold py-2 px-6 hover:bg-slate-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }
    if (analysisResult) {
      return <Results result={analysisResult} onReset={handleReset} />;
    }
    return <Questionnaire onStartEvaluation={handleStartEvaluation} />;
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
      <Disclaimer />
    </div>
  );
};

export default App;
