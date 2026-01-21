
import React from 'react';
import { Task, RatingValue } from '../types';
import { Info } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">How much did you enjoy these tasks?</h2>
        <p className="text-slate-500 mb-8">Reflect on your previous experience and rate your satisfaction level.</p>
        
        {/* Rating Legend */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-indigo-700 font-bold mb-4 justify-center">
            <Info className="w-5 h-5" />
            Rating Guide
          </div>
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">1</span>
              <span className="text-[10px] text-slate-500 font-medium">DRAINED ME</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gradient-to-r from-slate-200 via-indigo-300 to-indigo-600 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">5</span>
              <span className="text-[10px] text-indigo-700 font-bold">ENERGIZED ME</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm italic">
            Select <strong className="text-slate-800">N/A</strong> if you never performed this specific task in any of your roles.
          </p>
        </div>
      </div>

      <div className="grid gap-4 mb-24">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-indigo-200">
            <div className="flex-1">
              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                {task.category}
              </span>
              <p className="text-slate-800 font-semibold text-lg leading-snug">{task.description}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex bg-slate-50 p-1 rounded-xl">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleRate(task.id, val as RatingValue)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all font-bold ${
                      ratings[task.id] === val
                        ? 'bg-indigo-600 text-white shadow-md scale-110 z-10'
                        : 'hover:bg-indigo-100 text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleRate(task.id, 'N/A')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  ratings[task.id] === 'N/A'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                N/A
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white/50 flex flex-col items-center gap-3 z-20">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${(Object.keys(ratings).length / tasks.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-slate-600 font-bold whitespace-nowrap">
            {Object.keys(ratings).length} / {tasks.length}
          </span>
        </div>
        <button
          onClick={onNext}
          disabled={!isAllRated || isLoading}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl ${
            !isAllRated || isLoading
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Revealing Your Path...
            </div>
          ) : (
            'Unlock My Report'
          )}
        </button>
      </div>
    </div>
  );
};
