'use client';

import React, { useState } from 'react';
import { MapPin, Bell, SlidersHorizontal } from 'lucide-react';
import { SwipeCard } from '@/components/SwipeCard';
import { BottomNav } from '@/components/BottomNav';

// Mock data
const mockUsers = [
    {
        id: '1',
        name: 'Sarah',
        age: 26,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
        occupation: 'Product Designer',
        city: 'Mumbai',
        matchScore: 92,
    },
    {
        id: '2',
        name: 'Priya',
        age: 24,
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
        occupation: 'Software Engineer',
        city: 'Bangalore',
        matchScore: 87,
    },
    {
        id: '3',
        name: 'Ananya',
        age: 28,
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
        occupation: 'Marketing Manager',
        city: 'Delhi',
        matchScore: 85,
    },
    {
        id: '4',
        name: 'Neha',
        age: 25,
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        occupation: 'Data Scientist',
        city: 'Pune',
        matchScore: 79,
    },
];

export default function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [city] = useState('Mumbai');

    const handleLike = () => {
        console.log('Liked:', mockUsers[currentIndex]?.name);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePass = () => {
        console.log('Passed:', mockUsers[currentIndex]?.name);
        setCurrentIndex(prev => prev + 1);
    };

    const handleSave = () => {
        console.log('Saved:', mockUsers[currentIndex]?.name);
        setCurrentIndex(prev => prev + 1);
    };

    const handleUndo = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const visibleUsers = mockUsers.slice(currentIndex, currentIndex + 2);
    const allSeen = currentIndex >= mockUsers.length;

    return (
        <div className="min-h-screen gradient-home">
            {/* Header */}
            <header className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1
                            className="text-[38px] text-richRed"
                            style={{ fontFamily: 'var(--font-lobster)' }}
                        >
                            Cherry
                        </h1>
                        <div className="flex items-center gap-1 mt-1">
                            <MapPin size={14} className="text-champagneGold" />
                            <span className="text-sm text-placeholder font-medium">{city}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow relative">
                            <Bell size={24} className="text-primary" />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white" />
                        </button>
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                            <SlidersHorizontal size={24} className="text-primary" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center px-4 pb-32">
                {allSeen ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-primaryText mb-2">You&apos;ve seen everyone!</h2>
                        <p className="text-secondaryText mb-6">Check back later for new profiles</p>
                        <button
                            onClick={() => setCurrentIndex(0)}
                            className="px-8 py-3.5 gradient-button text-white font-semibold rounded-full shadow-premium hover:opacity-90 transition-opacity"
                        >
                            Revisit Profiles
                        </button>
                    </div>
                ) : (
                    <div className="relative w-full max-w-[360px] aspect-[3/4]">
                        {visibleUsers.map((user, index) => (
                            <SwipeCard
                                key={user.id}
                                user={user}
                                isTop={index === 0}
                                onLike={handleLike}
                                onPass={handlePass}
                                onSave={handleSave}
                                onUndo={handleUndo}
                            />
                        )).reverse()}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
