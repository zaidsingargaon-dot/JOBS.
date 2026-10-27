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
import { handleImageError } from "../../services/images";

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 rounded-full text-brand-800 text-xs font-bold mb-3">
            <span>Verified Local Trades</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("popularCategories")}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Explore daily-wage opportunities across skilled and semi-skilled local trades with guaranteed baseline pay.
          </p>
        </div>

        {/* Categories Photographic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {jobCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || HardHat;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-end min-h-[160px] sm:min-h-[180px] ${
                  isSelected
                    ? "ring-3 ring-brand-500 shadow-xl scale-[1.02] border-brand-500"
                    : "border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-brand-400"
                }`}
              >
                {/* Background Authentic Trade Image */}
                <img
                  src={cat.imageUrl}
                  alt={cat.en}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={handleImageError}
                />

                {/* Dark Gradient Overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent group-hover:from-slate-950/95 transition-colors" />

                {/* Top Corner Icon Pill */}
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-brand-700 flex items-center justify-center shadow-sm">
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content at Bottom */}
                <div className="relative p-3.5 z-10 text-left">
                  <h3 className="text-xs sm:text-sm font-extrabold text-white line-clamp-2 leading-snug drop-shadow-sm">
                    {cat[lang] || cat.en}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-black text-emerald-300 bg-emerald-950/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Min ₹{cat.minWage}/day
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* All Categories Pill button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onSelectCategory("all")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs"
          >
            <span>{t("allCategories")} (Show All 8 Active Postings)</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
