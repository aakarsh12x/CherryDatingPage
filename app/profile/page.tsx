'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { Settings, Edit3, Shield, Users, HelpCircle, LogOut, ChevronRight, MapPin, Briefcase } from 'lucide-react';

// Mock user data
const mockUser = {
    name: 'Alex',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    occupation: 'Software Engineer',
    city: 'Mumbai',
    bio: 'Coffee enthusiast who loves hiking on weekends. Always up for trying new restaurants and exploring the city.',
};

const menuItems = [
    { icon: Edit3, label: 'Edit Profile', href: '/profile/edit' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Shield, label: 'Safety & Privacy', href: '/safety' },
    { icon: Users, label: 'Emergency Contacts', href: '/emergency-contacts' },
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
];

export default function ProfilePage() {
    return (
        <div className="min-h-screen gradient-home pb-32">
            {/* Header */}
            <header className="px-6 pt-8 pb-4">
                <h1
                    className="text-[32px] text-brandDark"
                    style={{ fontFamily: 'var(--font-lobster)' }}
                >
                    Profile
                </h1>
            </header>

            {/* Profile Card */}
            <div className="px-6 mb-6">
                <div className="bg-white rounded-3xl p-6 shadow-card">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                            <Image
                                src={mockUser.photo}
                                alt={mockUser.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-primaryText">
                                {mockUser.name}, {mockUser.age}
                            </h2>
                            <div className="flex items-center gap-1 text-secondaryText text-sm mt-1">
                                <Briefcase size={14} />
                                <span>{mockUser.occupation}</span>
                            </div>
                            <div className="flex items-center gap-1 text-secondaryText text-sm">
                                <MapPin size={14} />
                                <span>{mockUser.city}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-secondaryText mt-4 text-sm leading-relaxed">
                        {mockUser.bio}
                    </p>

                    <Link
                        href="/profile/preview"
                        className="block w-full mt-4 py-3 text-center text-primary font-semibold border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                        Preview Profile
                    </Link>
                </div>
            </div>

            {/* Menu */}
            <div className="px-6">
                <div className="bg-white rounded-3xl overflow-hidden shadow-card">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center justify-between px-5 py-4 hover:bg-black/5 transition-colors ${index < menuItems.length - 1 ? 'border-b border-black/5' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon size={20} className="text-primary" />
                                    <span className="font-medium text-primaryText">{item.label}</span>
                                </div>
                                <ChevronRight size={20} className="text-placeholder" />
                            </Link>
                        );
                    })}
                </div>

                {/* Logout */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 text-error font-semibold hover:bg-error/5 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
