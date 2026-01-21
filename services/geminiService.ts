
import { GoogleGenAI, Type } from "@google/genai";
import { Job, Task, TaskRating, CareerReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTasksFromJobs = async (jobs: Job[]): Promise<Task[]> => {
  const jobTitles = jobs.map(j => j.title).join(", ");
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this list of past job titles: [${jobTitles}], generate up to 50 common professional tasks that a person in these roles would typically perform. Ensure the tasks are distinct and cover various aspects of work (technical, interpersonal, administrative, creative, leadership). Focus on high-impact verbs.`,
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
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse tasks", error);
    return [];
  }
};

export const generateCareerReport = async (ratings: TaskRating[]): Promise<CareerReport> => {
  const validRatings = ratings.filter(r => r.rating !== 'N/A');
  const ratingsContext = validRatings
    .map(r => `Task: "${r.taskDescription}", Enjoyment Level: ${r.rating}/5`)
    .join("\n");

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze these task enjoyment ratings.
    Ratings data:
    ${ratingsContext}

    1. Identify the top most enjoyable tasks.
    2. Recommend up to 10 job titles.
    3. Assign a "Career Archetype".
    4. Provide a "Power Move".
    5. NEW: Analyze "Environment Fit" - based on what they enjoy, should they be in a fast-paced startup, a stable corporation, a creative agency, or remote? What are culture "Warning Signs" they should avoid?`,
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
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to parse report", error);
    throw new Error("Could not generate report");
  }
};
