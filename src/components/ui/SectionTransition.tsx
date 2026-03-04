interface SectionTransitionProps {
  from: string;
  to: string;
  /** Height of the gradient band in pixels */
  height?: number;
}

/**
 * Renders a gradient band that smoothly blends two section backgrounds.
 * Place between sections with contrasting colors.
 *
 * `from` / `to` accept any CSS color value (hex, hsl, var(--token), etc.).
 */
export function SectionTransition({ from, to, height = 80 }: SectionTransitionProps) {
  return (
    <div
      aria-hidden
      className="w-full pointer-events-none"
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
