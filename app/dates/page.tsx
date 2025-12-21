'use client';

import React from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Calendar } from 'lucide-react';

export default function DatesPage() {
    return (
        <div className="min-h-screen gradient-home pb-32">
            {/* Header */}
            <header className="px-6 pt-8 pb-4">
                <h1
                    className="text-[32px] text-brandDark"
                    style={{ fontFamily: 'var(--font-lobster)' }}
                >
                    Dates
                </h1>
                <p className="text-[15px] text-captionText mt-1">
                    Your upcoming dates
                </p>
            </header>

            {/* Content */}
            <div className="px-6 py-8">
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Calendar size={36} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primaryText mb-2">
                        No dates scheduled
                    </h2>
                    <p className="text-secondaryText">
                        Match with someone and plan your first date!
                    </p>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
