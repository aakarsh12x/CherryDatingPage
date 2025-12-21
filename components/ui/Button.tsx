'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    loading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    loading = false,
    disabled = false,
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'h-14 rounded-[28px] px-7 font-medium text-base tracking-wide transition-all duration-200 flex items-center justify-center';

    const variantStyles = {
        primary: 'gradient-button text-ctaText shadow-premium hover:opacity-90 active:scale-[0.98]',
        secondary: 'bg-accent text-ctaText shadow-premium hover:opacity-90 active:scale-[0.98]',
        outline: 'bg-transparent border-1.5 border-primary text-primary hover:bg-primary/5 active:scale-[0.98]',
        text: 'bg-transparent text-primary hover:bg-primary/5',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed shadow-none';

    return (
        <button
            className={clsx(
                baseStyles,
                variantStyles[variant],
                (disabled || loading) && disabledStyles,
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}
