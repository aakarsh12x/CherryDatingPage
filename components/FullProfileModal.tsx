'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, MapPin, Briefcase, Ruler, GraduationCap, Wine, Cigarette, Quote, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { User } from './SwipeCard';

interface FullProfileModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onLike: () => void;
    onPass: () => void;
}

export function FullProfileModal({ user, isOpen, onClose, onLike, onPass }: FullProfileModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    // Expand mock data if missing for demo
    const photos = user.photos || [user.photo];
    const displayPhotos = photos.slice(0, 6);
    const prompts = user.prompts || [
        { question: "A life goal of mine", answer: "Visit every continent before I'm 30 and try the local coffee in each one." },
        { question: "The way to win me over is", answer: "Bring me tacos and let's watch a documentary about space." }
    ];

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        onLike();
        onClose();
    };

    const handlePass = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPass();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#F8F6F4] flex flex-col animate-in fade-in duration-200">
            {/* Header */}
            <div className="bg-white border-b border-black/5 px-4 py-3 flex items-center justify-between shadow-sm z-10">
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                    <ChevronDown size={24} className="text-gray-700" />
                </button>
                <span className="text-xl font-bold text-gray-800 font-brand">{user.name}'s Profile</span>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-32">
                <div className="max-w-md mx-auto px-4 py-4 space-y-4">

                    {/* Hero Photo */}
                    {displayPhotos[0] && (
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-card bg-white">
                            <Image
                                src={displayPhotos[0]}
                                alt={user.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Vitals Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-card">
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-[32px] font-bold text-gray-900 font-brand">
                                    {user.name}, {user.age}
                                </h2>
                                {user.matchScore && (
                                    <div className="flex items-center gap-1 bg-champagneGold px-3 py-1.5 rounded-full">
                                        <Heart size={14} className="text-primary fill-primary" />
                                        <span className="text-sm font-bold text-primary">{user.matchScore}%</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <MapPin size={16} className="text-primary" />
                                <span className="font-medium">{user.distance || user.city}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-4">
                            {user.occupation && (
                                <div className="flex items-center gap-2 bg-[#D4AF7D]/10 px-3.5 py-2.5 rounded-2xl">
                                    <Briefcase size={18} className="text-champagneGold" />
                                    <span className="text-sm font-medium text-gray-700">{user.occupation}</span>
                                </div>
                            )}
                            {user.height && (
                                <div className="flex items-center gap-2 bg-[#D4AF7D]/10 px-3.5 py-2.5 rounded-2xl">
                                    <Ruler size={18} className="text-champagneGold" />
                                    <span className="text-sm font-medium text-gray-700">{user.height}</span>
                                </div>
                            )}
                            {/* education mock */}
                            <div className="flex items-center gap-2 bg-[#D4AF7D]/10 px-3.5 py-2.5 rounded-2xl">
                                <GraduationCap size={18} className="text-champagneGold" />
                                <span className="text-sm font-medium text-gray-700">{user.education || "University"}</span>
                            </div>
                        </div>

                        {user.bio && (
                            <div className="pt-3 border-t border-black/5">
                                <p className="text-base text-gray-700 leading-relaxed font-normal">
                                    {user.bio || "No bio available."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Interleaved Photos & Prompts */}
                    {displayPhotos.slice(1).map((photo, i) => {
                        // Logic: Photo -> Prompt -> Photo -> Prompt...
                        const prompt = prompts[i];
                        return (
                            <React.Fragment key={i}>
                                {/* Photo */}
                                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-card bg-white">
                                    <Image
                                        src={photo}
                                        alt={`${user.name} ${i + 2}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Prompt (if available) */}
                                {prompt && (
                                    <div className="bg-white rounded-2xl p-6 shadow-card border-l-4 border-primary relative overflow-hidden">
                                        <Quote className="absolute top-4 left-4 text-primary opacity-10" size={48} />
                                        <div className="relative z-10">
                                            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
                                                {prompt.question}
                                            </p>
                                            <p className="text-[22px] font-domine text-gray-900 leading-snug">
                                                {prompt.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {/* Interests */}
                    {user.interests && user.interests.length > 0 && (
                        <div className="bg-white rounded-2xl p-5 shadow-card">
                            <h3 className="text-base font-bold text-gray-900 mb-3">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.interests.map((interest, idx) => (
                                    <span key={idx} className="bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/10">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Essentials */}
                    <div className="bg-white rounded-2xl p-5 shadow-card">
                        <h3 className="text-base font-bold text-gray-900 mb-3">Essentials</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                                <Wine size={20} className="text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Social drinker</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                                <Cigarette size={20} className="text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Non-smoker</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Action Buttons (Sticky Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
                <div className="flex items-center justify-center gap-8 max-w-md mx-auto">
                    <button
                        onClick={handlePass}
                        className="w-16 h-16 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] flex items-center justify-center border border-error/20 hover:scale-110 hover:shadow-xl transition-all duration-200"
                    >
                        <X size={32} className="text-error" strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={handleLike}
                        className="w-[72px] h-[72px] rounded-full gradient-button shadow-[0_8px_24px_rgba(235,90,60,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-[0_12px_32px_rgba(235,90,60,0.5)] transition-all duration-200"
                    >
                        <Heart size={32} className="text-white fill-white" />
                    </button>
                </div>
            </div>

        </div>
    );
}
