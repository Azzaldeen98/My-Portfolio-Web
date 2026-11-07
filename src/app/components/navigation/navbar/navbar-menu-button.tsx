import { Menu, X } from 'lucide-react';

type NavbarMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function NavbarMenuButton({
  isOpen,
  onToggle,
}: NavbarMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 md:hidden rounded-lg border border-border-main text-content-muted hover:bg-surface-hover transition-colors"
      aria-label="Toggle Menu"
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}
