import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

const actions = [
  {
    number: "01",
    label: "Communicate",
    title: "Let your hands speak.",
    description:
      "Use your camera to translate sign language into words and make everyday conversations easier.",
    button: "Start translating",
    link: "/live-translation",
  },
  {
    number: "02",
    label: "Learn",
    title: "One sign at a time.",
    description:
      "Start with alphabets and numbers, then build your vocabulary with useful everyday signs.",
    button: "Start learning",
    link: "/learn",
  },
  {
    number: "03",
    label: "Discover",
    title: "Find new ways to connect.",
    description:
      "Explore everyday signs and discover how sign language can become part of communication.",
    button: "Explore signs",
    link: "/learn",
  },
];

export const ActionCards = () => {
  return (
    <section className="bg-[#faf9f6] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <Reveal>
          <div className="max-w-3xl">

            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Explore SignProject
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl md:text-6xl">
              More than translation.
              <br />

              <span className="italic">
                A way to connect.
              </span>
            </h2>

          </div>
        </Reveal>


        {/* HORIZONTAL CARDS */}

        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {actions.map((action, index) => (

            <Reveal
              key={action.number}
              delay={index * 120}
            >

              <article
                className="
                  group
                  relative
                  flex
                  min-h-[430px]
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

                {/* NUMBER */}

                <div className="absolute right-6 top-5 font-serif text-7xl text-slate-900/[0.04]">
                  {action.number}
                </div>


                <div>

                  {/* SMALL LOGO */}

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">

                    <div className="flex items-center gap-1">

                      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />

                      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />

                      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />

                    </div>

                  </div>


                  {/* LABEL */}

                  <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                    {action.label}
                  </p>


                  {/* TITLE */}

                  <h3 className="mt-4 font-serif text-3xl leading-tight text-slate-950 sm:text-4xl">
                    {action.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="mt-5 text-sm leading-7 text-slate-500">
                    {action.description}
                  </p>

                </div>


                {/* BUTTON */}

                <Link
                  to={action.link}
                  className="
                    mt-8
                    flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-900/10
                    px-5
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    group-hover:bg-slate-950
                    group-hover:text-white
                  "
                >

                  {action.button}

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </Link>

              </article>

            </Reveal>

          ))}

        </div>

      </div>

    </section>
  );
};