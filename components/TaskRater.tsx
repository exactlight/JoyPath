import React from 'react';
import { Task, RatingValue } from '../types';
import { Info, CheckCircle2 } from 'lucide-react';

interface TaskRaterProps {
  tasks: Task[];
  ratings: Record<string, RatingValue>;
  setRatings: React.Dispatch<React.SetStateAction<Record<string, RatingValue>>>;
  onNext: () => void;
  isLoading: boolean;
}

export const TaskRater: React.FC<TaskRaterProps> = ({ tasks, ratings, setRatings, onNext, isLoading }) => {
  const handleRate = (taskId: string, rating: RatingValue) => {
    setRatings(prev => ({ ...prev, [taskId]: rating }));
  };

  const isAllRated = tasks.every(task => !!ratings[task.id]);
  const progress = (Object.keys(ratings).length / tasks.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 pb-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Rate Your Work Experience</h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-8 font-medium">
          How much did you actually enjoy these tasks? Be honest—this helps us find jobs that give you energy rather than drain it.
        </p>
        
        <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          <span>Drained Me (1)</span>
          <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-slate-400 to-indigo-600" />
          </div>
          <span>Energized Me (5)</span>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task, idx) => (
          <div key={task.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 transition-all hover:border-indigo-200 group">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Task {idx + 1}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded">{task.category}</span>
              </div>
              <p className="text-slate-800 font-bold text-lg leading-tight">{task.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleRate(task.id, val as RatingValue)}
                    className={`w-11 h-11 rounded-xl font-black transition-all ${
                      ratings[task.id] === val
                        ? 'bg-indigo-600 text-white shadow-lg scale-110 z-10'
                        : 'text-slate-400 hover:bg-white hover:text-indigo-600'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleRate(task.id, 'N/A')}
                className={`px-4 h-11 rounded-xl text-xs font-black transition-all ${
                  ratings[task.id] === 'N/A'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                N/A
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Persistent Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-40">
        <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xs font-black uppercase tracking-widest">Progress: {Math.round(progress)}%</span>
              <span className="text-indigo-400 text-xs font-black">{Object.keys(ratings).length} / {tasks.length} Completed</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={!isAllRated || isLoading}
            className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              !isAllRated || isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/20'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Path...
              </div>
            ) : (
              'Unlock Results'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};