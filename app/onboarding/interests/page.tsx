'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

const interests = [
    'Photography', 'Shopping', 'Karaoke', 'Yoga', 'Cooking', 'Tennis',
    'Running', 'Swimming', 'Art', 'Traveling', 'Adventure', 'Music',
    'Coffee', 'Video games', 'Hiking', 'Dancing', 'Reading', 'Coding'
];

export default function InterestsScreen() {
    const router = useRouter();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            if (selectedInterests.length < 5) {
                setSelectedInterests([...selectedInterests, interest]);
            }
        }
    };

    const handleContinue = async () => {
        if (selectedInterests.length === 0) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/work-education');
        }, 500);
    };

    return (
        <OnboardingLayout progress={56} backHref="/onboarding/photos">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    What are you into?
                </h1>
                <p className="text-base text-secondaryText mb-6 leading-relaxed font-medium">
                    Pick a few things you love. It helps break the ice. ({selectedInterests.length}/5)
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                    {interests.map((interest) => (
                        <Chip
                            key={interest}
                            label={interest}
                            selected={selectedInterests.includes(interest)}
                            onClick={() => toggleInterest(interest)}
                        />
                    ))}
                </div>

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={selectedInterests.length === 0}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
