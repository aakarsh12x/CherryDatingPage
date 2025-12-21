'use client';

import React from 'react';
import { clsx } from 'clsx';

interface OptionCardProps {
    label: string;
    emoji?: string;
    selected: boolean;
    onClick: () => void;
}

export function OptionCard({ label, emoji, selected, onClick }: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                'w-full flex items-center justify-between py-4.5 px-5 rounded-[20px] border transition-all duration-200',
                selected
                    ? 'bg-white border-primary shadow-[0_0_0_3px_rgba(94,11,29,0.1)]'
                    : 'glass border-white hover:bg-white/80'
            )}
        >
            <div className="flex items-center gap-3">
                {emoji && <span className="text-[22px]">{emoji}</span>}
                <span className={clsx(
                    'text-lg font-medium',
                    selected ? 'text-primary font-bold' : 'text-primaryText'
                )}>
                    {label}
                </span>
            </div>

            <div className={clsx(
                'w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center transition-all',
                selected
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300'
            )}>
                {selected && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                )}
            </div>
        </button>
    );
}
