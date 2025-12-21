'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { OptionCard } from '@/components/ui/OptionCard';
import { Button } from '@/components/ui/Button';

const relationshipOptions = [
    { label: 'Long-term relationship', value: 'long_term', emoji: '💍' },
    { label: 'Short-term, open to long', value: 'short_open_long', emoji: '💕' },
    { label: 'Long-term, open to short', value: 'long_open_short', emoji: '❤️' },
    { label: 'Short-term fun', value: 'short_term', emoji: '🎉' },
    { label: 'New friends', value: 'friends', emoji: '🤝' },
    { label: 'Still figuring it out', value: 'figuring_out', emoji: '🤔' },
];

export default function RelationshipGoalScreen() {
    const router = useRouter();
    const [goal, setGoal] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!goal) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/prompts');
        }, 500);
    };

    return (
        <OnboardingLayout progress={94} backHref="/onboarding/location">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    What are you looking for?
                </h1>
                <p className="text-base text-secondaryText mb-6 leading-relaxed font-medium">
                    Be honest — it helps find better matches.
                </p>

                <div className="space-y-3 overflow-y-auto flex-1">
                    {relationshipOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            emoji={option.emoji}
                            selected={goal === option.value}
                            onClick={() => setGoal(option.value)}
                        />
                    ))}
                </div>

                <div className="pt-4">
                    <Button
                        onClick={handleContinue}
                        disabled={!goal}
                        loading={loading}
                        className="w-full"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </OnboardingLayout>
    );
}
