import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

export const FinalCTA = () => {
  return (
    <section className="bg-[#f5f3ee] px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">

      <div className="mx-auto max-w-7xl">

        <Reveal>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24">

            {/* SUBTLE BACKGROUND */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl" />


            {/* CONTENT */}

            <div className="relative z-10 max-w-3xl">

              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Start with SignProject
              </p>

              <h2 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Ready to start
                <br />
                <span className="italic">
                  communicating?
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                Translate signs, learn something new, and discover a more
                accessible way to communicate.
              </p>


              {/* BUTTONS */}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/live-translation"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-medium
                    text-slate-950
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-slate-100
                  "
                >
                  Start Live Translation

                  <span>
                    →
                  </span>

                </Link>


                <Link
                  to="/learn"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    px-6
                    py-3.5
                    text-sm
                    font-medium
                    text-white
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-white/10
                  "
                >
                  Explore Learning
                </Link>

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
};