import React from "react";
import { 
  Building2, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Quote 
} from "lucide-react";
import { sampleEmployers } from "../../services/sampleData";
import { handleImageError } from "../../services/images";

export const EmployerShowcase = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 rounded-full text-brand-800 text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Verified Employers & Contractors</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by 2,400+ Local Contractors & Small Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Civil contractors, renovation agencies, shop owners, and warehouse supervisors hiring reliable local hands daily with zero commissions.
          </p>
        </div>

        {/* Employer Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleEmployers.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Avatar and Verification */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.contactPerson}
                      className="w-14 h-14 rounded-2xl object-cover object-center border-2 border-brand-500 shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                      onError={handleImageError}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center border-2 border-white" title="Verified Contractor">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {emp.contactPerson}
                    </h3>
                    <p className="text-xs font-bold text-brand-700">{emp.companyName}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{emp.location.split(",")[0]}</span>
                    </p>
                  </div>
                </div>

                {/* Business Type Badge & Rating */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md text-[11px]">
                    {emp.businessType.split("&")[0]}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{emp.rating}</span>
                  </div>
                </div>

                {/* About / Testimonial Quote */}
                <div className="my-4 text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-2xl border border-slate-100 relative">
                  <Quote className="w-4 h-4 text-brand-200 absolute -top-1.5 -left-1" />
                  <p className="pl-2 line-clamp-3">
                    "{emp.about}"
                  </p>
                </div>
              </div>

              {/* Bottom Metrics: Total Workers Hired */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users className="w-3.5 h-3.5 text-brand-600" />
                  <span className="font-extrabold text-slate-900">{emp.workersHiredCount}+</span>
                  <span className="text-[11px] text-slate-400">Workers Hired</span>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  100% Payout Rate
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

