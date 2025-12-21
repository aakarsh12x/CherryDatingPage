'use client';

import React from 'react';

interface ProgressBarProps {
    progress: number; // 0-100
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
            <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
}
