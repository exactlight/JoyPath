
import React, { useState, useEffect } from 'react';
import { AppStep, Job, Task, RatingValue, CareerReport, TaskRating } from './types.ts';
import { generateTasksFromJobs, generateCareerReport } from './services/geminiService.ts';
import { ProgressBar } from './components/ProgressBar.tsx';
import { JobInput } from './components/JobInput.tsx';
import { TaskRater } from './components/TaskRater.tsx';
import { ResultsDashboard } from './components/ResultsDashboard.tsx';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.JOB_INPUT);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ratings, setRatings] = useState<Record<string, RatingValue>>({});
  const [report, setReport] = useState<CareerReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleProcessJobs = async () => {
    setIsLoading(true);
    try {
      const generatedTasks = await generateTasksFromJobs(jobs);
      setTasks(generatedTasks);
      setStep(AppStep.TASK_RATING);
    } catch (error) {
      console.error(error);
      alert("Something went wrong generating tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const taskRatings: TaskRating[] = tasks.map(t => ({
        taskId: t.id,
        taskDescription: t.description,
        rating: ratings[t.id]
      }));
      
      const finalReport = await generateCareerReport(taskRatings);
      setReport(finalReport);
      setStep(AppStep.REPORT);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze your career data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(AppStep.JOB_INPUT);
    setJobs([]);
    setTasks([]);
    setRatings({});
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 pb-20">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 border-b border-slate-200 py-4 px-6 mb-8 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleReset}>
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">JoyPath</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            AI Alignment Active
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <ProgressBar currentStep={step} />
        </div>

        {step === AppStep.JOB_INPUT && (
          <JobInput 
            jobs={jobs} 
            setJobs={setJobs} 
            onNext={handleProcessJobs} 
            isLoading={isLoading} 
          />
        )}

        {step === AppStep.TASK_RATING && (
          <TaskRater 
            tasks={tasks} 
            ratings={ratings} 
            setRatings={setRatings} 
            onNext={handleGenerateReport} 
            isLoading={isLoading} 
          />
        )}

        {step === AppStep.REPORT && report && (
          <ResultsDashboard report={report} onReset={handleReset} />
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full py-3 px-6 bg-white/50 backdrop-blur-sm border-t border-slate-100 text-[10px] text-center text-slate-400 z-10 pointer-events-none">
        &copy; {new Date().getFullYear()} JoyPath Career Intelligence • Empowering Professional Fulfillment
      </footer>
    </div>
  );
};

export default App;
