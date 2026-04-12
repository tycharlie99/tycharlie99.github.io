"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Home, Archive, Mail, User, Github, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function LeftSidebar() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Archives', href: '/archives', icon: Archive },
    { name: 'About', href: '/about', icon: User },
  ];

  const socialItems = [
    { name: 'GitHub', href: 'https://github.com/tycharlie99', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/tsungyu-chan', icon: Linkedin },
    { name: 'Email', href: 'mailto:tycharlie.c@gmail.com', icon: Mail },
  ];
  return (
    <nav className="flex flex-col gap-6 py-8 px-8 w-full min-h-full">
      <div className="flex flex-col items-center gap-3 pt-2">
        <Image
          src="/avatar.webp"
          alt="Profile picture"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover border-2"
        />
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">Tsung-Yu Chan</p>
          <p className="text-xs text-foreground">Building things for the web. Curious, creative, caffeinated.</p>
        </div>
      </div>


      <div className="flex items-center justify-center gap-6">
        {socialItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground"
          >
            <item.icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {navItems.map((item) => {
          {/* Determine if the current path matches the nav item. For root path, it must be exact match. For others, it can be a prefix. */ }
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-4 transition-all duration-200 ${isActive
                ? "text-foreground font-bold" // Active state: darker and bolder
                : "text-muted hover:text-foreground"
                }`}
            >
              <item.icon
                size={18}
                strokeWidth={isActive ? 2 : 1.5}
                className={`transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
              />
              <span className="text-sm tracking-tight">{item.name}</span>

            </Link>
          );
        })}
      </div>

      <div className="flex-1" />

      <div className="pt-4 border-border flex justify-center">
        <ThemeToggle />
      </div>
    </nav>
  );

}
