import React from 'react';
import { CareerReport } from '../types';
import { Sparkles, RefreshCcw, Award, Zap, Building, Target, ShieldAlert } from 'lucide-react';

interface ResultsDashboardProps {
  report: CareerReport;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ report, onReset }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Header */}
      <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Sparkles className="w-48 h-48 rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
            Your Professional Archetype
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{report.archetype.name}</h2>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">{report.archetype.description}</p>
          <div className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-xl">
            <Target className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
            <div>
              <p className="text-sm font-bold text-indigo-200 uppercase tracking-wide">Recommended Power Move</p>
              <p className="text-slate-100">{report.archetype.powerMove}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ranked Tasks */}
        <section className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-slate-900 uppercase tracking-tight">Your Energy Drivers</h3>
          </div>
          <div className="space-y-3">
            {report.topTasks.map((task, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
                <span className="text-sm font-bold text-slate-700 leading-tight">{task.taskDescription}</span>
                <span className="text-indigo-600 font-black ml-4 bg-indigo-50 px-2 py-1 rounded-lg text-xs">
                  {task.rating}/5
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
            <div className="flex items-center gap-2 mb-4 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="font-bold text-sm uppercase">Red Flags to Avoid</h4>
            </div>
            <ul className="space-y-2">
              {report.environment.warningSigns.map((sign, i) => (
                <li key={i} className="text-xs font-medium text-rose-800 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                  {sign}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Job Recommendations */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 uppercase tracking-tight">Top 10 Career Pathways</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {report.recommendations.map((rec, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-slate-900 text-lg leading-tight uppercase tracking-tight">{rec.jobTitle}</h4>
                  <div className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-md">
                    {rec.alignmentScore}%
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-snug italic">"{rec.reason}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center pt-8 border-t border-slate-200">
        <button
          onClick={onReset}
          className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
        >
          <RefreshCcw className="w-5 h-5" />
          Start New Career Analysis
        </button>
      </div>
    </div>
  );
};