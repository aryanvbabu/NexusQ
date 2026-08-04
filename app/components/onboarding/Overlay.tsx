"use client";

type OverlayProps = {
  /** When true, overlay blocks clicks but stays visually clear (spotlight supplies dim). */
  transparent?: boolean;
  onBackdropClick?: () => void;
};

export default function Overlay({ transparent, onBackdropClick }: OverlayProps) {
  return (
    <div
      className={
        transparent
          ? "fixed inset-0 z-[90]"
          : "fixed inset-0 z-[90] bg-black/65 backdrop-blur-[1px]"
      }
      aria-hidden
      onClick={onBackdropClick}
    />
  );
}
