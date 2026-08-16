export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">

        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Features
        </p>

        <h2 className="mt-4 font-serif text-5xl text-slate-900 md:text-7xl">
          Everything you need
          <br />
          <span className="italic">to learn.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-900/10 p-8">
            <div className="text-4xl">🖐️</div>

            <h3 className="mt-6 text-2xl font-semibold">
              Learn
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Learn new signs through visual and interactive lessons.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-900/10 p-8">
            <div className="text-4xl">📷</div>

            <h3 className="mt-6 text-2xl font-semibold">
              Practice
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Practice your signs using your camera and improve your skills.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-900/10 p-8">
            <div className="text-4xl">📈</div>

            <h3 className="mt-6 text-2xl font-semibold">
              Progress
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Track the signs you've learned and see your progress over time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};