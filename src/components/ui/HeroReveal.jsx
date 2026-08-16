import { useEffect, useState } from "react";

export const HeroReveal = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};