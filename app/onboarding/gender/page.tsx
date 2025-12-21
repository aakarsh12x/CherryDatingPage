'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { OptionCard } from '@/components/ui/OptionCard';
import { Button } from '@/components/ui/Button';

const genderOptions = [
    { label: 'Male', value: 'male', emoji: '👨' },
    { label: 'Female', value: 'female', emoji: '👩' },
    { label: 'Non-Binary', value: 'non_binary', emoji: '🧑' },
    { label: 'Other', value: 'other', emoji: '✨' }
];

export default function GenderScreen() {
    const router = useRouter();
    const [gender, setGender] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!gender) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/interested-in');
        }, 500);
    };

    return (
        <OnboardingLayout progress={24} backHref="/onboarding/birthday">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Which best describes you?
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    Pick the option that best describes you.
                </p>

                <div className="space-y-3">
                    {genderOptions.map((option) => (
                        <OptionCard
                            key={option.value}
                            label={option.label}
                            emoji={option.emoji}
                            selected={gender === option.value}
                            onClick={() => setGender(option.value)}
                        />
                    ))}
                </div>

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={!gender}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
