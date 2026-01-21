import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TraitScores, AnalysisResult, Language } from "../types";

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    profileSummary: {
      type: Type.STRING,
      description: "A warm, encouraging 2-sentence summary of the student's personality based on traits.",
    },
    encouragement: {
      type: Type.STRING,
      description: "A short, reassuring message about how their unique mix of traits is valuable.",
    },
    topClusters: {
      type: Type.ARRAY,
      description: "The top 3 career clusters that match the student.",
      items: {
        type: Type.OBJECT,
        properties: {
          clusterName: { type: Type.STRING, description: "Name of the career cluster (e.g. Technology, Health)" },
          explanation: { type: Type.STRING, description: "Simple explanation of what this field involves." },
          whyItFits: { type: Type.STRING, description: "Why this matches the user's specific trait scores." },
          roles: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-5 example job titles, mixing modern and traditional."
          },
          moroccanEducationPath: { 
            type: Type.STRING, 
            description: "Specific education paths in Morocco (e.g., mention EST, FST, CPGE, OFPPT, or Universities without rankings). keep it general but relevant." 
          }
        },
        required: ["clusterName", "explanation", "whyItFits", "roles", "moroccanEducationPath"],
      },
    },
  },
  required: ["profileSummary", "encouragement", "topClusters"],
};

export async function generateCareerAnalysis(scores: TraitScores, language: Language = 'en'): Promise<AnalysisResult> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const languageName = {
    en: 'English',
    fr: 'French',
    ar: 'Arabic'
  }[language];

  const prompt = `
    You are a career orientation counselor for high school students in Morocco. 
    Analyze the following trait scores (0-10 scale) to suggest career paths.
    
    Scores:
    - Analytical: ${scores.analytical}
    - Creative: ${scores.creative}
    - Social: ${scores.social}
    - Independent: ${scores.independent}
    - Structured: ${scores.structured}
    - Flexible: ${scores.flexible}
    - Practical: ${scores.practical}
    - Conceptual: ${scores.conceptual}

    **IMPORTANT**: Provide the response in **${languageName}** language.

    Tone: Warm, reassuring, non-judgmental. Do not use complex jargon.
    Context: Morocco. When suggesting education paths, mention relevant Moroccan degrees or institution types (like CPGE, Grandes Ecoles, Fac, OFPPT, EST, ENSA, Architecture School, Beaux-Arts, etc.) but do not imply one is "better" than the other. Focus on fit.
    
    Output strictly in JSON format matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        temperature: 0.7, 
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini analysis failed", error);
    // Fallback in case of error to avoid crashing the app
    const fallback = {
      en: { summary: "We noticed you have a balanced mix of skills.", encouragement: "Exploring your future is a journey." },
      fr: { summary: "Nous avons remarqué que vous avez un mélange équilibré de compétences.", encouragement: "Explorer votre avenir est un voyage." },
      ar: { summary: "لاحظنا أن لديك مزيجاً متوازناً من المهارات.", encouragement: "استكشاف مستقبلك هو رحلة." }
    };
    const fb = fallback[language];

    return {
      profileSummary: fb.summary,
      encouragement: fb.encouragement,
      topClusters: []
    };
  }
}
