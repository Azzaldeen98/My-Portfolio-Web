import { Link } from '@/i18n/navigation';

type NavLinkProps = {
  href: string;
  label: string;
  mode: 'desktop' | 'mobile';
  isActive: boolean;
  onNavigate?: () => void;
};

export function NavLink({
  href,
  label,
  mode,
  isActive,
  onNavigate,
}: NavLinkProps) {
  const isMobile = mode === 'mobile';
  const activeClasses = isActive
    ? isMobile
      ? 'bg-surface-active  text-content-active '
      : 'text-content-active '
    : isMobile
      ? 'text-content-muted  hover:text-content-hover'
      : 'text-content-muted  hover:text-content-hover';

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={`${isMobile ? 'px-3 py-2 rounded-md text-base' : 'text-sm'} font-medium transition-colors ${activeClasses}`}
    >
      {label}
    </Link>
  );
}
