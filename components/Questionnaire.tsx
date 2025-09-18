import React, { useState } from 'react';

interface QuestionnaireProps {
  onStartEvaluation: (statement: string) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onStartEvaluation }) => {
  const [statement, setStatement] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (statement.trim().length < 20) {
      setError('Please provide a more detailed statement for an accurate evaluation (minimum 20 characters).');
      return;
    }
    setError('');
    onStartEvaluation(statement);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 border border-slate-300 shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="border-b-2 border-slate-400 pb-2 mb-6">
          <h2 className="text-lg font-bold text-slate-800">PATIENT INTAKE FORM</h2>
          <p className="text-sm text-slate-500">Case ID: #{new Date().getTime().toString().slice(-8)}</p>
        </div>
        
        <label htmlFor="statement" className="block text-sm font-bold text-slate-600 mb-2 font-mono tracking-wider">
          PATIENT'S STATEMENT
        </label>
        <p className="text-xs text-slate-500 mb-3">Please describe your current emotional state, recent events, or any thoughts occupying your mind. Be as descriptive as possible.</p>
        <textarea
          id="statement"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          rows={10}
          className="w-full p-3 bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none transition-shadow resize-y font-mono text-slate-900 placeholder:text-slate-500"
          placeholder="Begin writing here..."
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-slate-700 text-white font-bold py-3 px-10 hover:bg-slate-800 transition-colors tracking-wider"
          >
            BEGIN EVALUATION
          </button>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;