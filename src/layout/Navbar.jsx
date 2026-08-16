import {Button} from "../components/Button";
import {Menu,X} from "lucide-react";
import { useState} from "react";


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "How It Works", href: "#experience" },
    { name: "Features", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* ================= LOGO ================= */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
            <span className="text-lg font-semibold">S</span>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-900">
              SIGNPROJECT
            </p>

            <p className="text-[9px] tracking-[0.25em] text-slate-500">
              SIGN LANGUAGE
            </p>
          </div>
        </a>


        {/* ================= DESKTOP LINKS ================= */}
        <div className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-950"
            >
              {link.name}
            </a>
          ))}

        </div>


        {/* ================= DESKTOP BUTTON ================= */}
        <div className="hidden md:block">
          <a
            href="#learn"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700"
          >
            Start Learning →
          </a>
        </div>


        {/* ================= HAMBURGER ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col gap-1.5">

            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />

          </div>
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-black/5 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        <div className="flex flex-col px-6 py-5">

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="border-b border-slate-900/5 py-4 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#learn"
            onClick={handleLinkClick}
            className="mt-4 rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white"
          >
            Start Learning →
          </a>

        </div>

      </div>
    </nav>
  );
};