'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Calendar, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/matches', icon: Heart, label: 'Matches' },
    { href: '/dates', icon: Calendar, label: 'Dates' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200',
                                isActive
                                    ? 'bg-primary text-white'
                                    : 'text-secondaryText hover:bg-black/5'
                            )}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            {isActive && (
                                <span className="text-sm font-semibold">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
