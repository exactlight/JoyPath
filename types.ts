export interface Job {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  description: string;
  category: string;
}

export type RatingValue = 1 | 2 | 3 | 4 | 5 | 'N/A';

export interface TaskRating {
  taskId: string;
  taskDescription: string;
  rating: RatingValue;
}

export interface CareerRecommendation {
  jobTitle: string;
  reason: string;
  alignmentScore: number;
}

export interface CareerArchetype {
  name: string;
  description: string;
  powerMove: string;
}

export interface EnvironmentFit {
  cultureType: string;
  idealSetup: string;
  warningSigns: string[];
}

export interface CareerReport {
  archetype: CareerArchetype;
  environment: EnvironmentFit;
  topTasks: TaskRating[];
  recommendations: CareerRecommendation[];
  summary: string;
}

export enum AppStep {
  JOB_INPUT,
  TASK_RATING,
  REPORT
}