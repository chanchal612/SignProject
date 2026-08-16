export const CourseProgress = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">

      <div className="mb-3 flex items-center justify-between">

        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Your progress
        </p>

        <p className="text-sm text-slate-500">
          {current} / {total}
        </p>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/10">

        <div
          className="h-full rounded-full bg-slate-950 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-400">
        {percentage}% completed
      </p>

    </div>
  );
};