import { forwardRef, type ButtonHTMLAttributes, type ElementType } from "react";
import { Loader2 } from "lucide-react";

type Variant =
  | "primary"
  | "gold"
  | "secondary"
  | "outline"
  | "soft"
  | "ghost"
  | "danger"
  | "link";

type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ElementType;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
}

const base =
  "relative inline-flex items-center justify-center gap-2 select-none font-medium whitespace-nowrap rounded-xl transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg overflow-hidden group";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-8px_var(--accent)] hover:bg-accent-hover hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_14px_28px_-10px_var(--accent)] hover:-translate-y-0.5",
  gold:
    "bg-gold text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-8px_var(--gold)] hover:brightness-110 hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),0_14px_28px_-10px_var(--gold)] hover:-translate-y-0.5",
  secondary:
    "bg-surface text-text-primary border border-border shadow-sm hover:border-border-strong hover:bg-surface-secondary hover:-translate-y-0.5",
  outline:
    "bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent hover:bg-accent-soft",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary",
  soft: "bg-accent-soft text-accent hover:bg-accent hover:text-white",
  danger:
    "bg-danger text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-8px_var(--danger)] hover:brightness-110 hover:-translate-y-0.5",
  link: "bg-transparent text-accent underline-offset-4 hover:underline px-0 h-auto shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
  icon: "h-10 w-10 p-0",
};

const sheenVariants = new Set<Variant>(["primary", "gold", "danger"]);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className = "",
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "left",
    loading = false,
    fullWidth = false,
    disabled = false,
    ...props
  },
  ref
) {
  const showSheen = sheenVariants.has(variant);

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        base,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {showSheen && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[120%] group-hover:translate-x-[420%] transition-transform duration-700 ease-out" />
        </span>
      )}

      <span className="relative inline-flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          Icon &&
          iconPosition === "left" && (
            <Icon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          )
        )}

        <span className={loading ? "opacity-70" : ""}>{children}</span>

        {!loading && Icon && iconPosition === "right" && (
          <Icon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </span>
    </button>
  );
});

export default Button;