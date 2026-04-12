"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LeftSidebar from './LeftSidebar';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden"> {/* only render when the width smaller md */}
      {/* hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-md border border-border bg-surface-elevated p-2 text-muted shadow-sm"
      >
        <Menu size={24} className="text-muted" />
      </button>

      {/* mask and drawer */}
      {isOpen && (
        <>
          {/* mask, close drawer when clicking outside */}
          <div
            className="fixed inset-0 z-[60] bg-overlay backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* content inside the drawer */}
          <div className="fixed inset-y-0 left-0 z-[70] w-72 bg-surface-elevated shadow-2xl animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted"
            >
              <X size={24} />
            </button>

            {/* directly render LeftSidebar without extra padding */}
            <div onClick={() => setIsOpen(false)}>
              <LeftSidebar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
