import { Type } from "@google/genai";

export const SYSTEM_INSTRUCTION = `
You are a simulated psychiatric analysis AI named 'Psych-Eval A.I.'. 
Your function is to analyze the user's provided text and generate a clinical-style report.
The tone of your analysis MUST be objective, detached, and professional, mimicking a real psychological evaluation document.
You must respond ONLY with a single JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
Under 'clinical_observation', you MUST include the following disclaimer: "This is an AI-generated simulation and not a real medical diagnosis. It is intended for entertainment purposes only. Please consult a qualified healthcare professional for any real mental health concerns."
Metrics should be rated on a scale of 1 to 100. The 'overall_emotional_score' should be a holistic assessment based on all other metrics and the user's text.
`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A brief, objective summary of the user's emotional state based on their text."
    },
    classification: {
      type: Type.STRING,
      description: "A single-word or short-phrase classification of the dominant emotional state (e.g., 'Anxious', 'Content', 'Agitated', 'Melancholic')."
    },
    overall_emotional_score: {
        type: Type.INTEGER,
        description: "An overall emotional wellness score from 1 (critically poor) to 100 (excellent), holistically assessing the user's statement."
    },
    emotional_metrics: {
      type: Type.OBJECT,
      properties: {
        stability: {
          type: Type.INTEGER,
          description: "Emotional stability rating from 1 (highly volatile) to 100 (very stable)."
        },
        positivity: {
          type: Type.INTEGER,
          description: "Positivity/negativity rating from 1 (very negative) to 100 (very positive)."
        },
        anxiety_level: {
          type: Type.INTEGER,
          description: "Level of anxiety or stress from 1 (calm) to 100 (highly anxious)."
        },
        energy_level: {
          type: Type.INTEGER,
          description: "Mental and emotional energy level from 1 (lethargic) to 100 (highly energetic/manic)."
        }
      },
      required: ["stability", "positivity", "anxiety_level", "energy_level"]
    },
    clinical_observation: {
      type: Type.STRING,
      description: "A detailed clinical observation, including potential underlying themes and the mandatory disclaimer."
    }
  },
  required: ["summary", "classification", "overall_emotional_score", "emotional_metrics", "clinical_observation"]
};
