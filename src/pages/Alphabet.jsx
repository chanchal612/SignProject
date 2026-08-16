import { useState } from "react";
import { SignLesson } from "../components/learning/SignLesson";
import { alphabetLessons } from "../data/alphabets";

export const Alphabet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSign = alphabetLessons[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    if (currentIndex === alphabetLessons.length - 1) {
      return;
    }

    setCurrentIndex((current) => current + 1);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee]">

      {/* NAVBAR */}
      <nav className="border-b border-slate-900/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">

          <a href="/" className="flex items-center gap-3">
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

        </div>
      </nav>

      {/* LESSON */}
      <main className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16">

        <SignLesson
          sign={currentSign}
          currentIndex={currentIndex}
          total={alphabetLessons.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

      </main>

    </div>
  );
};