export const Hero = () => {
  return (
    <section 
    id="hero"
    className="relative min-h-screen overflow-hidden bg-white">

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/white-bg.jpg"
          alt="Sign language"
          className="h-full w-full object-cover"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-white/50" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div className="text-center">

          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-slate-600">
            Learn • Practice • Communicate
          </p>

          <h1 className="font-serif text-7xl leading-[0.85] tracking-tight text-slate-900 md:text-9xl">
            Your hands
            <br />
            <span className="italic">
              have a voice.
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-xl text-lg leading-8 text-slate-700">
            Learn sign language through interactive lessons
            and real-time practice.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <button className="rounded-full bg-slate-900 px-7 py-4 text-sm font-medium text-white hover:bg-slate-700">
              <a
              href="/live-translation"
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                Live Translation
              </a>
  
            </button>

            <button className="rounded-full border border-slate-900/20 bg-white/50 px-7 py-4 text-sm font-medium text-slate-900 backdrop-blur-sm hover:bg-white/80">
              Explore Lessons
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};