"use client";

import Link from "next/link";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Livne Farm Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">Livne Farm</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="font-medium text-foreground transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/fields" className="font-medium text-foreground transition-colors hover:text-primary">
            Fields
          </Link>
          <Link href="/tasks" className="font-medium text-foreground transition-colors hover:text-primary">
            Tasks
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
} 