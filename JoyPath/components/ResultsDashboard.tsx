
import React from 'react';
import { CareerReport } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, Award, Zap, RefreshCcw, Sparkles, Rocket, Home, AlertTriangle, Building2 } from 'lucide-react';

interface ResultsDashboardProps {
  report: CareerReport;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ report, onReset }) => {
  const chartData = report.topTasks.map(t => ({
    name: t.taskDescription.length > 25 ? t.taskDescription.substring(0, 25) + '...' : t.taskDescription,
    fullName: t.taskDescription,
    score: t.rating
  }));

  const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Archetype Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
            <Sparkles className="w-3 h-3" />
            Your Work Archetype
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
            {report.archetype.name}
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            {report.archetype.description}
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex gap-4 items-start">
            <div className="bg-indigo-500 p-3 rounded-xl shrink-0">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-300 text-sm uppercase tracking-wider mb-1">Recommended Power Move</h4>
              <p className="text-white font-medium">{report.archetype.powerMove}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Blueprint Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600">
            <Building2 className="w-6 h-6" />
          </div>
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Culture Match</h4>
          <p className="text-slate-600 font-medium leading-relaxed">{report.environment.cultureType}</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col gap-4">
          <div className="bg-sky-50 w-12 h-12 rounded-2xl flex items-center justify-center text-sky-600">
            <Home className="w-6 h-6" />
          </div>
          <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Ideal Setup</h4>
          <p className="text-slate-600 font-medium leading-relaxed">{report.environment.idealSetup}</p>
        </div>

        <div className="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 flex flex-col gap-4">
          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h4 className="font-black text-rose-900 uppercase text-xs tracking-widest">Red Flags</h4>
          <ul className="space-y-2">
            {report.environment.warningSigns.map((sign, i) => (
              <li key={i} className="text-rose-700 text-xs font-bold flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-amber-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Your Energy Drivers</h3>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" hide domain={[0, 5]} />
                <YAxis dataKey="name" type="category" width={160} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-2xl max-w-xs border border-white/10">
                          {payload[0].payload.fullName}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-indigo-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Prime Job Fits</h3>
          </div>
          <div className="space-y-4">
            {report.recommendations.map((rec, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-slate-900 text-lg group-hover:text-indigo-700 transition-colors tracking-tight">{rec.jobTitle}</h4>
                  <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-sm">
                    {rec.alignmentScore}% FIT
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-snug font-medium italic">"{rec.reason}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col items-center gap-8 py-12 border-t border-slate-200">
        <div className="bg-indigo-50 p-8 rounded-[2rem] max-w-2xl text-center border-2 border-indigo-100 shadow-inner">
          <h4 className="font-black text-indigo-900 text-xl mb-3 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Your Next Chapter
          </h4>
          <p className="text-indigo-700 font-medium text-lg mb-4">
            A career that prioritizes <strong>{report.topTasks[0]?.taskDescription}</strong> will likely lead to the highest long-term satisfaction for you.
          </p>
          <p className="text-indigo-500 text-sm">
            Ready to pivot? Use these titles as your primary search filters.
          </p>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
        >
          <RefreshCcw className="w-5 h-5" />
          Start New Search
        </button>
      </div>
    </div>
  );
};
