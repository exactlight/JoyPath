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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Build Your Work History</h2>
      <p className="text-slate-500 mb-6">List the job titles you've held in the past.</p>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="e.g. Senior Software Engineer"
          className="w-full pl-4 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={addJob} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium"><Plus /></button>
      </div>
      <div className="space-y-3 mb-8">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <span className="font-medium text-slate-700">{job.title}</span>
            <button onClick={() => removeJob(job.id)} className="text-slate-400 hover:text-red-500"><Trash2 /></button>
          </div>
        ))}
      </div>
      <button onClick={onNext} disabled={jobs.length === 0 || isLoading} className="w-full py-4 rounded-xl font-bold bg-indigo-600 text-white">
        {isLoading ? 'Analyzing...' : 'Analyze My Roles'}
      </button>
    </div>
  );
};