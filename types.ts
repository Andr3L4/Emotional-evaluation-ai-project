export interface EmotionalMetrics {
  stability: number;
  positivity: number;
  anxiety_level: number;
  energy_level: number;
}

export interface AnalysisResult {
  summary: string;
  classification: string;
  overall_emotional_score: number;
  emotional_metrics: EmotionalMetrics;
  clinical_observation: string;
}
