import React from 'react';
import {
  AirVent,
  Droplets,
  Zap,
  Sparkles,
  Scissors,
  Hammer,
  ShieldAlert,
  Paintbrush,
  Bug,
  Wrench,
  Grid,
  Clock,
} from 'lucide-react';
import { Category } from '../../types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onOpenCategoryPage?: (category: Category) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  AirVent: <AirVent className="w-6 h-6 text-sky-600" />,
  Droplets: <Droplets className="w-6 h-6 text-blue-600" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-purple-600" />,
  Scissors: <Scissors className="w-6 h-6 text-pink-600" />,
  Hammer: <Hammer className="w-6 h-6 text-orange-600" />,
  Paintbrush: <Paintbrush className="w-6 h-6 text-emerald-600" />,
  Bug: <Bug className="w-6 h-6 text-teal-600" />,
  Wrench: <Wrench className="w-6 h-6 text-indigo-600" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-rose-600" />,
};

const ARRIVAL_TIME_MAP: Record<string, string> = {
  'ac-appliance': '44 mins',
  'electrical': '49 mins',
  'plumbing': '45 mins',
  'carpentry-painting': '55 mins',
  'cleaning': '60 mins',
  'pest-control': '50 mins',
  'painting': 'Tomorrow',
  'salon': '47 mins',
  'appliance': '50 mins',
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onOpenCategoryPage,
}) => {
  return (
    <section id="category-grid-section" className="mx-4 sm:mx-6 lg:mx-8 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Explore All Service Categories
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a service to browse guaranteed pricing and verified nearby professionals
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectCategory('all')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              selectedCategoryId === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Show All ({categories.reduce((acc, c) => acc + c.serviceCount, 0)} Services)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const arrival = ARRIVAL_TIME_MAP[cat.id] || '30-45 mins';

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (onOpenCategoryPage) {
                  onOpenCategoryPage(cat);
                } else {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('services-catalog-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center p-4 rounded-2xl text-center border transition-all duration-200 cursor-pointer group relative ${
                isSelected
                  ? 'bg-blue-50/60 border-blue-600 ring-2 ring-blue-500/20 shadow-sm -translate-y-0.5'
                  : 'bg-white border-slate-200/80 hover:border-blue-400 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Arrival Tag */}
              <div className="absolute top-2.5 right-2.5">
                <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {arrival}
                </span>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                  isSelected ? 'bg-white shadow-xs' : 'bg-slate-50'
                }`}
              >
                {ICON_MAP[cat.icon] || <Grid className="w-6 h-6 text-slate-600" />}
              </div>

              <span className={`text-xs font-bold line-clamp-1 mb-1 ${
                isSelected ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
              }`}>
                {cat.name}
              </span>

              <span className="text-[11px] text-slate-400 font-medium">
                {cat.serviceCount} options available
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
