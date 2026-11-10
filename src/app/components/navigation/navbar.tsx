'use client';

import { useState } from 'react';
import { NavbarActions } from './navbar/navbar-actions';
import { NavbarBrand } from './navbar/navbar-brand';
import { NavbarLinks } from './navbar/navbar-links';
import { NavbarMenuButton } from './navbar/navbar-menu-button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-main bg-surface backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarBrand />

          {/* <NavbarLinks mode="desktop" /> */}

          <div className="flex items-center gap-3">
            <NavbarActions />
            <NavbarMenuButton
              isOpen={isOpen}
              onToggle={() => setIsOpen((open) => !open)}
            />
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border-main">
            <NavbarLinks mode="mobile" onNavigate={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
