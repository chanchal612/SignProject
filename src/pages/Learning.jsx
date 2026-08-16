import { CourseCard } from "../components/learning/CourseCard";
import { Reveal } from "../components/ui/Reveal";
import { Link } from "react-router-dom";

const courses = [
  {
    number: "01",
    title: "Alphabets",
    count: "26 signs",
    description:
      "Learn the signs for A–Z and build the foundation for communicating with sign language.",
    image: "/alphabet.webp",
    link: "/learn/alphabet",
  },
  {
    number: "02",
    title: "Numbers",
    count: "10 signs",
    description:
      "Learn numbers from 0–9 and become familiar with another essential part of everyday communication.",
    image: "/numbers.webp",
    link: "/learn/numbers",
  },
  {
    number: "03",
    title: "Daily Words",
    count: "20+ signs",
    description:
      "Learn useful everyday signs for greetings, conversations and common situations.",
    image: "/dailywords.png",
    link: "/learn/daily-words",
  },
];

export const Learning = () => {
  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* NAVBAR */}

      <nav className="border-b border-slate-900/10 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              S
            </div>

            <div>

              <p className="text-sm font-semibold">
                SIGNPROJECT
              </p>

              <p className="text-[9px] tracking-[0.25em] text-slate-500">
                LEARNING
              </p>

            </div>

          </a>


          <a
            href="/"
            className="text-sm text-slate-500 transition hover:text-slate-950"
          >
            ← Back
          </a>

        </div>

      </nav>


      {/* HERO */}

      <main>

        <section className="px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                SignProject Learning
              </p>

              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-8xl">
                Learn a language
                <br />
                <span className="italic">
                  without words.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                Start with the basics, learn useful signs and gradually build
                your understanding of sign language.
              </p>

            </Reveal>


            {/* COURSES */}

            <div className="mt-20 grid gap-5 md:grid-cols-3">

              {courses.map((course, index) => (

                <Reveal
                  key={course.number}
                  delay={index * 100}
                >

                  <CourseCard
                    number={course.number}
                    title={course.title}
                    count={course.count}
                    description={course.description}
                    image={course.image}
                    link={course.link}
                  />

                </Reveal>

              ))}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};