import { Link } from "react-router-dom";

export const ProgressSection = () => {
  const hasStartedCourse = false;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">

      <div className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-[#f1eee7]">

        <div className="grid items-center gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Your progress
            </p>

            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">

              Your learning
              <span className="italic">
                {" "}journey
              </span>

              <br />

              starts here.

            </h2>

            <p className="mt-5 max-w-lg leading-7 text-slate-600">

              Start a course to track the signs you've learned,
              continue where you left off, and build your vocabulary
              over time.

            </p>

            <Link
              to="/learn"
              className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {hasStartedCourse
                ? "View My Progress"
                : "Start Learning"}
            </Link>

          </div>


          {/* EMPTY PROGRESS STATE */}

          <div className="flex justify-center">

            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white/70">

              <div className="text-center">

                <div className="text-6xl">
                  🌱
                </div>

                <p className="mt-5 text-sm font-medium text-slate-800">
                  No courses started yet
                </p>

                <p className="mt-2 max-w-[180px] text-xs leading-5 text-slate-500">
                  Choose a course to begin your journey.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};