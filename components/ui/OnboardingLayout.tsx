'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    progress: number;
    backHref?: string;
    onBack?: () => void;
}

export function OnboardingLayout({
    children,
    progress,
    backHref,
    onBack
}: OnboardingLayoutProps) {
    const BackComponent = backHref ? Link : 'button';
    const backProps = backHref
        ? { href: backHref }
        : { onClick: onBack, type: 'button' as const };

    return (
        <div className="min-h-screen gradient-warm">
            {/* Header */}
            <header className="flex items-center gap-5 px-6 py-4 pt-6">
                <BackComponent
                    {...backProps as any}
                    className="text-primaryText text-3xl font-light hover:opacity-70 transition-opacity"
                >
                    <ChevronLeft size={28} strokeWidth={2} />
                </BackComponent>
                <ProgressBar progress={progress} />
            </header>

            {/* Content */}
            <main className="flex flex-col min-h-[calc(100vh-80px)] px-8 pb-8">
                {children}
            </main>
        </div>
    );
}
