'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { OptionCard } from '@/components/ui/OptionCard';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

const lifestyleOptions = {
    smoking: [
        { label: 'Never', value: 'never', emoji: '🚭' },
        { label: 'Sometimes', value: 'sometimes', emoji: '🔥' },
        { label: 'Regularly', value: 'regularly', emoji: '🚬' },
    ],
    drinking: [
        { label: 'Never', value: 'never', emoji: '🚫' },
        { label: 'Socially', value: 'socially', emoji: '🍷' },
        { label: 'Regularly', value: 'regularly', emoji: '🍻' },
    ],
    exercise: [
        { label: 'Never', value: 'never', emoji: '😴' },
        { label: 'Sometimes', value: 'sometimes', emoji: '🚶' },
        { label: 'Often', value: 'often', emoji: '🏋️' },
    ],
};

export default function LifestyleScreen() {
    const router = useRouter();
    const [smoking, setSmoking] = useState<string | null>(null);
    const [drinking, setDrinking] = useState<string | null>(null);
    const [exercise, setExercise] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/bio');
        }, 500);
    };

    const renderSection = (
        title: string,
        options: typeof lifestyleOptions.smoking,
        value: string | null,
        setValue: (v: string) => void
    ) => (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutralText mb-3 uppercase tracking-wider">
                {title}
            </h3>
            <div className="flex gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue(option.value)}
                        className={clsx(
                            'flex-1 py-3 px-4 rounded-xl border transition-all text-center',
                            value === option.value
                                ? 'bg-white border-primary shadow-sm'
                                : 'glass border-white hover:bg-white/80'
                        )}
                    >
                        <div className="text-xl mb-1">{option.emoji}</div>
                        <div className={clsx(
                            'text-sm font-medium',
                            value === option.value ? 'text-primary' : 'text-secondaryText'
                        )}>
                            {option.label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <OnboardingLayout progress={72} backHref="/onboarding/work-education">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Your lifestyle
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    Help us understand your habits.
                </p>

                {renderSection('Smoking', lifestyleOptions.smoking, smoking, setSmoking)}
                {renderSection('Drinking', lifestyleOptions.drinking, drinking, setDrinking)}
                {renderSection('Exercise', lifestyleOptions.exercise, exercise, setExercise)}

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
