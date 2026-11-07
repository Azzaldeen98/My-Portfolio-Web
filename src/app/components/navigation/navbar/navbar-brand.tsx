import Link from 'next/link';

export function NavbarBrand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-content-main">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] text-content-on-primary">
        A
      </span>
      <span className="tracking-tight">Azzaldeen<span className="text-primary">Tech</span></span>
    </Link>
  );
}
