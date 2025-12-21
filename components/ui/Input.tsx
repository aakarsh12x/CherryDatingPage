'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    className,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mb-6 w-full">
            {label && (
                <label className="block text-xs text-secondaryText mb-2.5 font-medium tracking-widest uppercase">
                    {label}
                </label>
            )}
            <input
                className={clsx(
                    'w-full h-15 bg-white rounded-[20px] px-6 text-[17px] text-primaryText',
                    'border transition-all duration-200 font-medium',
                    'placeholder:text-placeholder',
                    isFocused && !error && 'border-champagneGold border-2 shadow-[0_0_0_3px_rgba(198,168,124,0.15)]',
                    !isFocused && !error && 'border-black/8',
                    error && 'border-accent border-2',
                    className
                )}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
                {...props}
            />
            {error && (
                <p className="text-xs text-accent mt-2 ml-2 font-medium">{error}</p>
            )}
        </div>
    );
}
