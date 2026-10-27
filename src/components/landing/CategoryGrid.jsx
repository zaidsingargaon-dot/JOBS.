import React from "react";
import { 
  HardHat, 
  Paintbrush, 
  Wrench, 
  Hammer, 
  Zap, 
  Truck, 
  Sprout, 
  Sparkles, 
  Flame, 
  Navigation, 
  Shield, 
  Users,
  ArrowRight
} from "lucide-react";
import { jobCategories } from "../../services/translations";
import { useLanguage } from "../../context/LanguageContext";

const iconMap = {
  HardHat,
  Paintbrush,
  Wrench,
  Hammer,
  Zap,
  Truck,
  Sprout,
  Sparkles,
  Flame,
  Navigation,
  Shield,
  Users
};

export const CategoryGrid = ({ onSelectCategory, selectedCategory }) => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("popularCategories")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Explore daily-wage opportunities across skilled and semi-skilled local trades with guaranteed baseline pay.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {jobCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || HardHat;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-between min-h-[140px] ${
                  isSelected
                    ? "bg-brand-50 border-brand-500 shadow-md ring-2 ring-brand-500/20"
                    : "bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-brand-300 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors mb-2 ${
                  isSelected
                    ? "bg-brand-600 text-white"
                    : "bg-white text-brand-600 group-hover:bg-brand-600 group-hover:text-white shadow-xs border border-slate-100"
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                    {cat[lang] || cat.en}
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">
                    Min ₹{cat.minWage}/day
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Categories Pill button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onSelectCategory("all")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            <span>{t("allCategories")} (Show All 8 Active Postings)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

