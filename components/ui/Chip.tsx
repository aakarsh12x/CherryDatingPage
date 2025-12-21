'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export function Chip({ label, selected, onClick }: ChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                'px-5 py-3 rounded-full border transition-all duration-200 text-base font-medium',
                selected
                    ? 'bg-primary border-primary text-white shadow-[0_4px_12px_rgba(94,11,29,0.2)]'
                    : 'glass border-white text-primaryText hover:bg-white/80'
            )}
        >
            {label}
        </button>
    );
}
