import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

const paths = [
  {
    number: "01",
    title: "Alphabets",
    description:
      "Start with A–Z and learn the basic signs that form the foundation of sign language.",
    action: "Learn alphabets",
  },
  {
    number: "02",
    title: "Numbers",
    description:
      "Learn numbers from 0–9 and build confidence with another essential part of everyday communication.",
    action: "Learn numbers",
  },
  {
    number: "03",
    title: "Daily words",
    description:
      "Learn useful signs for greetings, conversations and situations you encounter every day.",
    action: "Learn daily words",
  },
];

export const LearningPaths = () => {
  return (
    <section className="bg-[#f5f3ee] px-6 py-28 sm:px-10 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <Reveal>

          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Start learning
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl md:text-6xl">
              Learn sign language
              <br />
              <span className="italic">at your own pace.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Whether you're starting from the beginning or simply want to
              learn a few useful signs, choose a path and begin.
            </p>

          </div>

        </Reveal>


        {/* LEARNING PATHS */}

        <div className="mt-16 grid gap-5 md:grid-cols-3">

          {paths.map((path, index) => (

            <Reveal
              key={path.number}
              delay={index * 100}
            >

              <Link
                to="/learn"
                className="
                  group
                  relative
                  flex
                  min-h-[380px]
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-slate-900/10
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:p-8
                "
              >

                {/* LARGE NUMBER */}

                <span className="absolute right-6 top-3 font-serif text-8xl text-slate-900/[0.035]">
                  {path.number}
                </span>


                <div>

                  {/* SMALL MARK */}

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                    S
                  </div>


                  <p className="mt-8 text-xs uppercase tracking-[0.25em] text-slate-400">
                    {path.number} / Learning
                  </p>


                  <h3 className="mt-4 font-serif text-3xl text-slate-950 sm:text-4xl">
                    {path.title}
                  </h3>


                  <p className="mt-5 text-sm leading-7 text-slate-500">
                    {path.description}
                  </p>

                </div>


                {/* ACTION */}

                <div className="mt-8 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-900">
                    {path.action}
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-900/10
                      transition-all
                      duration-300
                      group-hover:bg-slate-950
                      group-hover:text-white
                    "
                  >
                    →
                  </span>

                </div>

              </Link>

            </Reveal>

          ))}

        </div>

      </div>

    </section>
  );
};