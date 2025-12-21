'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { OptionCard } from '@/components/ui/OptionCard';
import { Button } from '@/components/ui/Button';

const interestedOptions = [
    { label: 'Men', value: 'male', emoji: '👨' },
    { label: 'Women', value: 'female', emoji: '👩' },
    { label: 'Everyone', value: 'everyone', emoji: '💕' },
];

export default function InterestedInScreen() {
    const router = useRouter();
    const [interestedIn, setInterestedIn] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!interestedIn) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/height');
        }, 500);
    };

    return (
        <OnboardingLayout progress={32} backHref="/onboarding/gender">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Who are you interested in?
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    This helps us find better matches for you.
                </p>

                <div className="space-y-3">
                    {interestedOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            emoji={option.emoji}
                            selected={interestedIn === option.value}
                            onClick={() => setInterestedIn(option.value)}
                        />
                    ))}
                </div>

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={!interestedIn}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
