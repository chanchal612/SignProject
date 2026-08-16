import { Link } from "react-router-dom";
import { HeroReveal } from "../ui/HeroReveal";

export const DashboardHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f5f3ee]">

      {/* IMAGE */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-[75%]
          overflow-hidden
          opacity-60
          sm:w-[65%]
          sm:opacity-75
          lg:w-[58%]
          lg:opacity-90
        "
      >

        <img
          src="/signproject-hands.png"
          alt=""
          className="
            absolute
            right-[-18%]
            top-1/2
            h-[85%]
            w-full
            -translate-y-1/2
            object-cover
            object-center

            sm:right-[-12%]
            sm:h-[100%]

            lg:right-[-8%]
            lg:h-[115%]
          "
        />

        {/* LEFT BLEND */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#f5f3ee]
            via-[#f5f3ee]/80
            via-40%
            to-transparent
          "
        />

        {/* TOP / BOTTOM BLEND */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#f5f3ee]/30
            via-transparent
            to-[#f5f3ee]
          "
        />

        {/* MOBILE EXTRA BLEND */}

        <div
          className="
            absolute
            inset-0
            bg-[#f5f3ee]/20
            sm:bg-transparent
          "
        />

      </div>


      {/* CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

        <div className="flex min-h-[620px] items-center sm:min-h-[650px] lg:min-h-[680px]">

          <div>


            {/* LABEL */}

            <HeroReveal delay={0}>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 sm:text-xs sm:tracking-[0.3em]">
                Welcome to SignProject
              </p>

            </HeroReveal>


            {/* TITLE */}

            <HeroReveal delay={120}>

              <h1
                className="
                  mt-5
                  max-w-3xl
                  font-serif
                  text-[3.2rem]
                  leading-[0.98]
                  tracking-tight
                  text-slate-950

                  sm:mt-6
                  sm:text-6xl

                  md:text-7xl

                  lg:text-[6.5rem]
                "
              >
                Communication
                <br />
                beyond{" "}
                <span className="italic">
                  words.
                </span>
              </h1>

            </HeroReveal>


            {/* DESCRIPTION */}

            <HeroReveal delay={240}>

              <p
                className="
                  mt-6
                  max-w-md
                  text-sm
                  leading-6
                  text-slate-600

                  sm:mt-7
                  sm:max-w-xl
                  sm:text-base
                  sm:leading-7

                  lg:text-lg
                "
              >
                A bridge between sign language and spoken communication.
                Translate signs in real time, learn the language, and
                discover new ways to connect.
              </p>

            </HeroReveal>


            {/* BUTTONS */}

            <HeroReveal delay={360}>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-3

                  sm:mt-9
                  sm:flex-row
                "
              >

                <Link
                  to="/live-translation"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-slate-950
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-slate-800

                    sm:px-6
                    sm:py-3.5
                  "
                >

                  Start Live Translation

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
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
                    border-slate-900/15
                    bg-white/70
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-slate-900
                    backdrop-blur-sm
                    transition
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-white

                    sm:px-6
                    sm:py-3.5
                  "
                >
                  Explore Learning
                </Link>

              </div>

            </HeroReveal>


            {/* INFO CARD */}

            <HeroReveal delay={480}>

              <div
                className="
                  mt-9
                  flex
                  max-w-md
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-900/10
                  bg-white/60
                  p-4
                  backdrop-blur-md

                  sm:mt-12
                  sm:gap-5
                  sm:p-5
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-950
                    text-sm
                    text-white

                    sm:h-10
                    sm:w-10
                    sm:text-base
                  "
                >
                  S
                </div>


                <div className="h-9 w-px bg-slate-900/10 sm:h-10" />


                <div>

                  <p className="text-xs font-medium text-slate-900 sm:text-sm">
                    Built for communication
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                    Learn, translate and understand sign language.
                  </p>

                </div>

              </div>

            </HeroReveal>

          </div>

        </div>

      </div>

    </section>
  );
};