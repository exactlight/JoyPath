
import React from 'react';
import { AppStep } from '../types';

interface ProgressBarProps {
  currentStep: AppStep;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { id: AppStep.JOB_INPUT, label: 'Work History' },
    { id: AppStep.TASK_RATING, label: 'Task Analysis' },
    { id: AppStep.REPORT, label: 'Career Report' },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center bg-white px-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep >= step.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white border-slate-300 text-slate-400'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`mt-2 text-xs font-semibold uppercase tracking-wider ${
                currentStep >= step.id ? 'text-indigo-600' : 'text-slate-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
