
import React, { useState } from 'react';
import { Plus, Briefcase, Trash2 } from 'lucide-react';
import { Job } from '../types';

interface JobInputProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  onNext: () => void;
  isLoading: boolean;
}

export const JobInput: React.FC<JobInputProps> = ({ jobs, setJobs, onNext, isLoading }) => {
  const [currentTitle, setCurrentTitle] = useState('');

  const addJob = () => {
    if (currentTitle.trim()) {
      setJobs([...jobs, { id: crypto.randomUUID(), title: currentTitle.trim() }]);
      setCurrentTitle('');
    }
  };

  const removeJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addJob();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Build Your Work History</h2>
      <p className="text-slate-500 mb-6">List the job titles you've held in the past. Be as specific as possible.</p>
      
      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g. Senior Software Engineer"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <button
          onClick={addJob}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {jobs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
            No jobs added yet. Add your first role above.
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group animate-in fade-in slide-in-from-bottom-2">
              <span className="font-medium text-slate-700">{job.title}</span>
              <button
                onClick={() => removeJob(job.id)}
                className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={onNext}
        disabled={jobs.length === 0 || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
          jobs.length === 0 || isLoading
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-indigo-300'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing Job Titles...
          </div>
        ) : (
          'Analyze My Roles'
        )}
      </button>
    </div>
  );
};
