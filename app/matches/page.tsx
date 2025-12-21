'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MatchCard } from '@/components/MatchCard';
import { BottomNav } from '@/components/BottomNav';

// Mock data
const mockMatches = [
    { id: '1', name: 'Sarah', age: 26, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop' },
    { id: '2', name: 'Priya', age: 24, photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop' },
    { id: '3', name: 'Ananya', age: 28, photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop' },
];

const mockSaved = [
    { id: '4', name: 'Neha', age: 25, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop' },
    { id: '5', name: 'Riya', age: 27, photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop' },
];

function Section({ title, data, showMore = false }: { title: string; data: typeof mockMatches; showMore?: boolean }) {
    if (data.length === 0) return null;

    return (
        <section className="mb-8">
            <h2 className="text-lg font-bold text-neutralText mb-4 tracking-wide">
                {title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                {data.map((match) => (
                    <MatchCard key={match.id} {...match} />
                ))}
                {showMore && (
                    <button className="aspect-[4/3] rounded-3xl border-2 border-dashed border-champagneGold/30 bg-lightBackground/80 flex flex-col items-center justify-center gap-2 hover:bg-white/50 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <ChevronRight size={24} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium text-primary">Show More</span>
                    </button>
                )}
            </div>
        </section>
    );
}

export default function MatchesPage() {
    return (
        <div className="min-h-screen gradient-home pb-32">
            {/* Header */}
            <header className="px-6 pt-8 pb-4">
                <h1
                    className="text-[32px] text-brandDark"
                    style={{ fontFamily: 'var(--font-lobster)' }}
                >
                    Matches
                </h1>
                <p className="text-[15px] text-captionText mt-1">
                    Find your perfect date
                </p>
            </header>

            {/* Content */}
            <div className="px-4">
                {mockMatches.length === 0 && mockSaved.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-secondaryText font-medium">
                            No matches yet. Start swiping!
                        </p>
                    </div>
                ) : (
                    <>
                        <Section title="Your Matches" data={mockMatches} showMore={mockMatches.length > 3} />
                        <Section title="Saved for Later" data={mockSaved} />
                    </>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
