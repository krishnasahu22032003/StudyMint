import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Sparkles, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";
import handleGoogleAuth from "../../utils/handlegoogleauth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

const Logo = () => (
<a href="#" className="relative flex items-center gap-3 group">
  <span className="absolute -left-3 -top-3 w-14 h-14 rounded-full bg-gold/20 blur-2xl opacity-0 scale-75 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" />

  <span className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-surface border border-border/80 backdrop-blur-xl shadow-soft overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-accent/40">
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="w-7 h-7 transition-transform duration-700 group-hover:rotate-6"
    >
      <defs>
        <linearGradient
          id="studymintGradient"
          x1="6"
          y1="6"
          x2="34"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>

      <path
        d="M28.5 8C24 8 20 10.8 20 15C20 19.2 24 20.5 28 22C31.5 23.3 34 24.5 34 28.2C34 32 30.5 34 25.5 34C21.5 34 18 32.5 15.5 29.5"
        stroke="url(#studymintGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M11.5 32C16 32 20 29.2 20 25C20 20.8 16 19.5 12 18C8.5 16.7 6 15.5 6 11.8C6 8 9.5 6 14.5 6C18.5 6 22 7.5 24.5 10.5"
        stroke="url(#studymintGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle
        cx="14"
        cy="8"
        r="2"
        fill="var(--gold)"
        className="transition-all duration-500 group-hover:scale-125"
      />

      <circle
        cx="26"
        cy="32"
        r="2"
        fill="var(--accent)"
        className="transition-all duration-500 group-hover:scale-125"
      />
    </svg>
  </span>

  <div className="flex items-baseline">
    <span className="font-display text-[22px] font-bold tracking-tight text-text-primary">
      Study
    </span>

    <span className="font-display text-[22px] font-bold tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] bg-clip-text text-transparent">
      Mint
    </span>
  </div>
</a>
);

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="relative text-[15px] font-medium text-text-primary/70 hover:text-text-primary transition-colors duration-200 py-1"
  >
    {label}
    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-accent to-gold transition-all duration-300 ease-out group-hover:w-full" />
  </a>
);

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={[
        "relative cursor-pointer  w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-strong hover:bg-surface-secondary transition-colors duration-200 overflow-hidden",
        className,
      ].join(" ")}
    >
      <Sun
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark"
            ? "opacity-0 -rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-50"
        }`}
      />
    </button>
  );
};

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

    const handleGoogleLogin = async () => {
    await handleGoogleAuth(dispatch);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "glass border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.label} className="group">
                  <NavLink {...link} />
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="primary" size="md" icon={Sparkles} className="cursor-pointer" onClick={handleGoogleLogin}>
                Get Started
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-primary hover:bg-surface-secondary transition-colors duration-200 overflow-hidden"
            >
              <Menu
                className={`absolute w-4 h-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute w-4 h-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-6 pt-2 flex flex-col gap-1 border-t border-border">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`px-3 py-3 rounded-lg text-[15px] font-medium text-text-primary/70 hover:text-text-primary hover:bg-surface-secondary transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-border">
              <Button variant="primary" fullWidth icon={ArrowRight} iconPosition="right" className="cursor-pointer" onClick={handleGoogleLogin}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
