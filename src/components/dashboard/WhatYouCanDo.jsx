import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

const features = [
  {
    number: "01",
    title: "Communicate",
    description:
      "Use your camera to translate sign language in real time and make everyday conversations easier.",
    link: "/live-translation",
    action: "Start translating",
  },
  {
    number: "02",
    title: "Learn",
    description:
      "Build your understanding of sign language through alphabets, numbers and useful everyday signs.",
    link: "/learn",
    action: "Start learning",
  },
  {
    number: "03",
    title: "Explore",
    description:
      "Discover signs beyond the basics and find new ways to make sign language part of everyday communication.",
    link: "/learn",
    action: "Explore signs",
  },
];

export const WhatYouCanDo = () => {
  return (
    <section className="bg-white px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <Reveal>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                What you can do
              </p>

              <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
                Communication,
                <br />
                <span className="italic">learning, and discovery.</span>
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-500">
              SignProject is designed for people who want to communicate,
              understand sign language, or simply discover something new.
            </p>

          </div>

        </Reveal>


        {/* FEATURES */}

        <div className="mt-20 border-t border-slate-900/10">

          {features.map((feature, index) => (

            <Reveal
              key={feature.number}
              delay={index * 100}
            >

              <div
                className="
                  group
                  grid
                  gap-6
                  border-b
                  border-slate-900/10
                  py-10

                  sm:grid-cols-[80px_1fr_auto]
                  sm:items-center
                  sm:gap-8
                  sm:py-12

                  lg:grid-cols-[100px_1fr_220px]
                  lg:gap-12
                "
              >

                {/* NUMBER */}

                <span className="font-serif text-3xl text-slate-300">
                  {feature.number}
                </span>


                {/* CONTENT */}

                <div>

                  <h3 className="font-serif text-3xl text-slate-950 transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                    {feature.description}
                  </p>

                </div>


                {/* LINK */}

                <Link
                  to={feature.link}
                  className="
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
                    text-slate-900
                    transition-all
                    duration-300
                    hover:bg-slate-950
                    hover:text-white
                  "
                >

                  {feature.action}

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>

                </Link>

              </div>

            </Reveal>

          ))}

        </div>

      </div>

    </section>
  );
};