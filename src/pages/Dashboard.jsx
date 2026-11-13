
import { Link } from "react-router-dom";

import { DashboardHero } from "../components/dashboard/DashboardHero";
import { ActionCards } from "../components/dashboard/ActionCards";
import { HowItWorks } from "../components/dashboard/HowItWorks";
import { WhatYouCanDo } from "../components/dashboard/WhatYouCanDo";
import { FinalCTA } from "../components/dashboard/FinalCTA";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-950">

      {/* Navigation */}
      <nav className="border-b border-slate-900/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              S
            </div>

            <div>
              <p className="text-sm font-semibold">SIGNPROJECT</p>
              <p className="text-[9px] tracking-[0.25em] text-slate-500">
                BRIDGING HANDS & WORDS
              </p>
            </div>
          </div>

          <div className="flex gap-6 text-sm text-slate-600">
            <span>Communicate</span>
            <span>Learn</span>
            <span>Explore</span>
          </div>

        </div>
      </nav>

      {/* Main Content */}
      <main>

        <DashboardHero />

        <ActionCards />

        {/* Experiment Dashboard Button */}
        <section className="mx-auto max-w-7xl px-6 py-6">

          <Link
            to="/experiment"
            className="group flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white p-6 transition-all duration-300 hover:border-slate-900/20 hover:shadow-md"
          >

            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Experiment Dashboard
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Run gesture recognition trials and collect research data.
              </p>
            </div>

            <span className="text-lg text-slate-500 transition-transform group-hover:translate-x-1">
              →
            </span>

          </Link>

        </section>

        <HowItWorks />

        <WhatYouCanDo />

        <FinalCTA />

      </main>

    </div>
  );
};

export default Dashboard;
