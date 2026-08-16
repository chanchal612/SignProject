import { Reveal } from "../ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Show your hands.",
    description:
      "Place your hands in front of the camera and start signing naturally. SignProject watches your movements in real time.",
    image: "/signimage1.webp",
    position: "left",
  },
  {
    number: "02",
    title: "We recognize the sign.",
    description:
      "Our recognition system identifies the gesture and connects it with the meaning behind the sign.",
    image: "/signimage2.webp",
    position: "right",
  },
  {
    number: "03",
    title: "Start the conversation.",
    description:
      "Your signs become understandable words, helping you communicate with people who may not know sign language.",
    image: "/signimage3.webp",
    position: "left",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-[#f5f3ee] px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">

      <div className="mx-auto max-w-7xl">

        {/* SECTION INTRO */}

        <Reveal>

          <div className="max-w-4xl">

            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
              How it works
            </p>

            <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-slate-950 sm:text-6xl md:text-7xl lg:text-[6rem]">
              From a sign
              <br />
              to a{" "}
              <span className="italic">
                conversation.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              SignProject makes communication easier by turning
              sign language into something everyone can understand.
            </p>

          </div>

        </Reveal>
        
        {/* STEPS */}
        
        <div className="mt-32 space-y-24 sm:mt-40 sm:space-y-32 lg:mt-48 lg:space-y-44">

          {steps.map((step, index) => (
            
            <Reveal
            
            key={step.number}
            delay={index * 100}
            >
              <article className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#ebe9e3] sm:min-h-[460px] lg:min-h-[520px]">
                
                {/* IMAGE */}

                  <div
                    className={`
                      absolute
                      inset-y-0
                      w-[68%]
                      overflow-hidden

                      sm:w-[62%]

                      lg:w-[55%]

                      ${
                        step.position === "right"
                          ? "right-0"
                          : "left-0"
                      }
                    `}
                  >

                    <img
                      src={step.image}
                      alt={step.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        hover:scale-105
                      "
                    />

                    {/* IMAGE BLEND */}

                    <div
                      className={`
                        absolute
                        inset-0
                        ${
                          step.position === "right"
                            ? "bg-gradient-to-l"
                            : "bg-gradient-to-r"
                        }
                        from-[#ebe9e3]/10
                        via-[#ebe9e3]/50
                        to-[#ebe9e3]
                      `}
                    />

                  </div>


                  {/* CONTENT */}

                  <div
                    className={`
                      relative
                      z-10
                      flex
                      min-h-[430px]
                      items-center
                      px-7
                      py-12

                      sm:min-h-[460px]
                      sm:px-12

                      lg:min-h-[520px]
                      lg:px-20

                      ${
                        step.position === "right"
                          ? "justify-start"
                          : "justify-end"
                      }
                    `}
                  >

                    <div className="w-full max-w-lg">

                      {/* NUMBER */}

                      <div className="flex items-center gap-4">

                        <span className="text-xs font-medium tracking-[0.25em] text-slate-400">
                          {step.number}
                        </span>

                        <div className="h-px w-10 bg-slate-900/15" />

                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          SignProject
                        </span>

                      </div>


                      {/* TITLE */}

                      <h3 className="mt-7 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                        {step.title}
                      </h3>


                      {/* DESCRIPTION */}

                      <p className="mt-6 max-w-md text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                        {step.description}
                      </p>


                      {/* SMALL LINE */}

                      <div className="mt-8 flex items-center gap-3">

                        <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />

                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          {index === 0 && "Real-time recognition"}

                          {index === 1 && "Smart interpretation"}

                          {index === 2 && "Better communication"}
                        </span>

                      </div>

                    </div>

                  </div>

                </article>

              </Reveal>

            ))}

          </div>


        {/* ENDING */}

        <Reveal delay={150}>

          <div className="mt-32 border-t border-slate-900/10 pt-10 sm:mt-44">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <p className="max-w-md text-sm leading-6 text-slate-500">
                Communication should never depend on whether two people
                speak the same language.
              </p>

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-slate-950" />

                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Built for connection
                </span>

              </div>

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
};