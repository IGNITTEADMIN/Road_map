type ButtonVariant = "action" | "nav" | "page";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "action",
  className = "",
  ...props
}: ButtonProps) {

  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50";

  const variantClasses =
    variant === "action"
      ? "button type1"
      : variant === "nav"
      ? "nav-button"
      : "page-button";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}