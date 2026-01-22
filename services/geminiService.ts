import { GoogleGenAI, Type } from "@google/genai";
import { Job, Task, TaskRating, CareerReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTasksFromJobs = async (jobs: Job[]): Promise<Task[]> => {
  const jobTitles = jobs.map(j => j.title).join(", ");
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this list of past job titles: [${jobTitles}], generate exactly 25 distinct, common professional tasks that a person in these roles would typically perform. 
    Ensure the tasks cover technical skills, soft skills, and administrative duties. 
    Return them as a JSON array of objects with id, description, and category.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["id", "description", "category"],
        },
      },
    },
  });

  try {
    const text = response.text || "[]";
    const parsed = JSON.parse(text);
    return parsed.slice(0, 25); // Ensure we return exactly 25 tasks as requested
  } catch (error) {
    console.error("Failed to parse tasks", error);
    return [];
  }
};

export const generateCareerReport = async (ratings: TaskRating[]): Promise<CareerReport> => {
  const validRatings = ratings.filter(r => r.rating !== 'N/A');
  const ratingsContext = validRatings
    .map(r => `Task: "${r.taskDescription}", Enjoyment: ${r.rating}/5`)
    .join("\n");

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these task enjoyment ratings:
    ${ratingsContext}
    
    The user highly enjoys tasks rated 4-5 and dislikes tasks rated 1-2. 
    
    Based on this analysis, generate a report including:
    1. A "Career Archetype" summarizing their work style.
    2. An "Environment Fit" analysis (Ideal culture, setup, and red flags).
    3. Exactly 10 recommended job titles that prioritize the tasks they enjoy most.
    
    Return the response in strict JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          archetype: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              powerMove: { type: Type.STRING }
            },
            required: ["name", "description", "powerMove"]
          },
          environment: {
            type: Type.OBJECT,
            properties: {
              cultureType: { type: Type.STRING },
              idealSetup: { type: Type.STRING },
              warningSigns: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["cultureType", "idealSetup", "warningSigns"]
          },
          topTasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                taskId: { type: Type.STRING },
                taskDescription: { type: Type.STRING },
                rating: { type: Type.NUMBER },
              },
              required: ["taskId", "taskDescription", "rating"],
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                jobTitle: { type: Type.STRING },
                reason: { type: Type.STRING },
                alignmentScore: { type: Type.NUMBER },
              },
              required: ["jobTitle", "reason", "alignmentScore"],
            }
          },
          summary: { type: Type.STRING },
        },
        required: ["archetype", "environment", "topTasks", "recommendations", "summary"],
      },
    },
  });

  try {
    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    // Ensure recommendations are limited to exactly 10
    if (parsed.recommendations) {
      parsed.recommendations = parsed.recommendations.slice(0, 10);
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse career report", error);
    throw new Error("Analysis failed. Please try again.");
  }
};