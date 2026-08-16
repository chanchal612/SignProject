import { Link } from "react-router-dom";

export const CourseCard = ({
  number,
  title,
  description,
  count,
  image,
  link = "/learn",
}) => {
  return (
    <Link
      to={link}
      className="
        group
        relative
        flex
        min-h-[430px]
        flex-col
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-900/10
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* IMAGE */}

      <div className="relative h-52 overflow-hidden bg-[#ebe8df]">

        {image ? (
          <img
            src={image}
            alt={title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-7xl text-slate-900/10">
              {number}
            </span>
          </div>
        )}

        <div className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1.5 text-xs backdrop-blur-md">
          {count}
        </div>

      </div>


      {/* CONTENT */}

      <div className="flex flex-1 flex-col justify-between p-7">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Course {number}
          </p>

          <h3 className="mt-3 font-serif text-3xl text-slate-950">
            {title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            {description}
          </p>

        </div>


        <div className="mt-7 flex items-center justify-between">

          <span className="text-sm font-medium">
            Start learning
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

      </div>

    </Link>
  );
};