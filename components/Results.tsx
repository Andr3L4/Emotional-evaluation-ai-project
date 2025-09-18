import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const getMetricColor = (label: string, value: number): string => {
    // For these metrics, a higher score is generally better.
    const positiveMetrics = ['Stability', 'Positivity'];
    // For these, a lower score is generally better.
    const negativeMetrics = ['Anxiety Level'];

    let scoreForColoring: number;

    if (positiveMetrics.includes(label)) {
        scoreForColoring = value; // Direct value: high is good.
    } else if (negativeMetrics.includes(label)) {
        scoreForColoring = 100 - value; // Inverted value: low is good.
    } else { // Neutral metrics like 'Energy Level'
        if (value < 20 || value > 80) return 'bg-yellow-400'; // Extremes are notable.
        return 'bg-green-400'; // Mid-range is balanced.
    }

    if (scoreForColoring < 33) return 'bg-red-400';
    if (scoreForColoring < 66) return 'bg-yellow-400';
    return 'bg-green-400';
};


const MetricBar: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const bgColor = getMetricColor(label, value);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1 font-mono text-sm">
        <span className="text-slate-600 uppercase tracking-wider">{label}</span>
        <span className="font-bold text-slate-800">{value}/100</span>
      </div>
      <div className="w-full bg-slate-200 h-4 border border-slate-300">
        <div className={`h-full ${bgColor} transition-all duration-500`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = () => {
    if (score < 33) return { text: 'text-red-600', border: 'border-red-500' };
    if (score < 66) return { text: 'text-yellow-600', border: 'border-yellow-500' };
    return { text: 'text-green-600', border: 'border-green-500' };
  };
  const { text, border } = getScoreColor();

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 h-full">
        <h3 className="font-bold text-slate-700 font-mono tracking-wider mb-3 text-center">OVERALL SCORE</h3>
        <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center border-8 ${border}`}>
            <span className={`text-4xl sm:text-5xl font-bold ${text}`}>{score}</span>
        </div>
    </div>
  );
};


const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const { summary, classification, overall_emotional_score, emotional_metrics, clinical_observation } = result;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 border border-slate-300 shadow-2xl animate-fade-in">
        <div className="border-b-2 border-slate-400 pb-2 mb-6">
          <h2 className="text-lg font-bold text-slate-800">PATIENT ANALYSIS REPORT</h2>
           <p className="text-sm text-slate-500">CONFIDENTIAL</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 p-4 bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-700 font-mono tracking-wider mb-2">SUMMARY</h3>
                <p className="text-slate-600 text-sm">{summary}</p>
            </div>
             <div className="flex flex-col gap-6">
                <ScoreGauge score={overall_emotional_score} />
                <div className="p-4 bg-slate-50 border border-slate-200 text-center">
                    <h3 className="font-bold text-slate-700 font-mono tracking-wider mb-2">CLASSIFICATION</h3>
                    <p className="text-2xl font-bold text-red-700">{classification.toUpperCase()}</p>
                </div>
            </div>
        </div>
        
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-700 font-mono tracking-wider mb-3">EMOTIONAL METRICS</h3>
            <MetricBar label="Stability" value={emotional_metrics.stability} />
            <MetricBar label="Positivity" value={emotional_metrics.positivity} />
            <MetricBar label="Anxiety Level" value={emotional_metrics.anxiety_level} />
            <MetricBar label="Energy Level" value={emotional_metrics.energy_level} />
        </div>
        
        <div className="mb-8 p-4 bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-700 font-mono tracking-wider mb-2">CLINICAL OBSERVATION</h3>
            <p className="text-slate-600 text-sm whitespace-pre-wrap font-mono">{clinical_observation}</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onReset}
            className="bg-slate-700 text-white font-bold py-3 px-10 hover:bg-slate-800 transition-colors tracking-wider"
          >
            NEW EVALUATION
          </button>
        </div>
    </div>
  );
};

export default Results;
