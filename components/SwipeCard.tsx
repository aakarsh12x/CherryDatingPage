'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Briefcase, Heart, X, RotateCcw, Bookmark } from 'lucide-react';
import { clsx } from 'clsx';

export interface User {
    id: string;
    name: string;
    age: number;
    photo: string;
    occupation: string;
    city: string;
    matchScore?: number;
    bio?: string;
    photos?: string[];
    prompts?: { question: string; answer: string }[];
    height?: string;
    education?: string;
    distance?: string;
    interests?: string[];
}

interface SwipeCardProps {
    user: User;
    onLike: () => void;
    onPass: () => void;
    onSave: () => void;
    onUndo: () => void;
    onTap: () => void;
    isTop: boolean;
}

export function SwipeCard({ user, onLike, onPass, onSave, onUndo, onTap, isTop }: SwipeCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;

        if (info.offset.x > threshold) {
            onLike();
        } else if (info.offset.x < -threshold) {
            onPass();
        } else {
            // If little movement, consider it a tap if we didn't drag far
            if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) {
                onTap();
            }
        }
    };

    return (
        <motion.div
            className={clsx(
                'absolute w-full max-w-[360px] aspect-[3/4] rounded-[32px] overflow-hidden bg-white shadow-card cursor-grab active:cursor-grabbing',
                !isTop && 'pointer-events-none'
            )}
            style={{
                x: isTop ? x : 0,
                y: isTop ? y : 0,
                rotate: isTop ? rotate : 0,
                scale: isTop ? 1 : 0.95,
                zIndex: isTop ? 2 : 1,
            }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            onClick={() => {
                // Fallback for click not captured by drag
                if (isTop) onTap();
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Photo */}
            <Image
                src={user.photo}
                alt={user.name}
                fill
                className="object-cover"
            />

            {/* Like/Nope Overlays */}
            {isTop && (
                <>
                    <motion.div
                        className="absolute top-12 left-8 border-4 border-like rounded-lg px-4 py-2 rotate-[-15deg]"
                        style={{ opacity: likeOpacity }}
                    >
                        <span className="text-like text-3xl font-extrabold tracking-wider">LIKE</span>
                    </motion.div>
                    <motion.div
                        className="absolute top-12 right-8 border-4 border-error rounded-lg px-4 py-2 rotate-[15deg]"
                        style={{ opacity: nopeOpacity }}
                    >
                        <span className="text-error text-3xl font-extrabold tracking-wider">NOPE</span>
                    </motion.div>
                </>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 gradient-card-overlay" />

            {/* User Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-extrabold text-white">
                        {user.name}, {user.age}
                    </h2>
                    {user.matchScore && (
                        <div className="flex items-center gap-1 bg-champagneGold px-2.5 py-1 rounded-full">
                            <Heart size={12} className="text-primary fill-primary" />
                            <span className="text-sm font-bold text-primary">{user.matchScore}%</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-white/80 mb-1">
                    <Briefcase size={14} />
                    <span className="text-[15px] font-medium">{user.occupation}</span>
                </div>

                <div className="flex items-center gap-2 text-white/80">
                    <MapPin size={14} />
                    <span className="text-[15px] font-medium">{user.city}</span>
                </div>
            </div>

            {/* Action Buttons - Rendered outside the capture area to prevent tap propagation issues if needed, but here we use pointer-events-auto to re-enable them */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-5 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onUndo}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                    <RotateCcw size={20} className="text-champagneGold" />
                </button>

                <button
                    onClick={onPass}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    <X size={30} className="text-error" strokeWidth={3} />
                </button>

                <button
                    onClick={onLike}
                    className="w-16 h-16 gradient-button rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    <Heart size={30} className="text-white fill-white" />
                </button>

                <button
                    onClick={onSave}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
                    <Bookmark size={20} className="text-primary" />
                </button>
            </div>
        </motion.div>
    );
}
