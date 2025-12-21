'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/Button';

export default function BioScreen() {
    const router = useRouter();
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    const maxLength = 300;

    const handleContinue = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/location');
        }, 500);
    };

    return (
        <OnboardingLayout progress={80} backHref="/onboarding/lifestyle">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Tell us about yourself
                </h1>
                <p className="text-base text-secondaryText mb-6 leading-relaxed font-medium">
                    Write a short bio to let others know who you are.
                </p>

                <div className="relative">
                    <textarea
                        placeholder="I'm a coffee enthusiast who loves hiking on weekends..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
                        rows={6}
                        className="w-full bg-white rounded-[20px] p-5 text-base text-primaryText border border-black/8 focus:border-champagneGold focus:border-2 focus:outline-none transition-all resize-none font-medium placeholder:text-placeholder"
                    />
                    <div className="absolute bottom-3 right-4 text-sm text-secondaryText">
                        {bio.length}/{maxLength}
                    </div>
                </div>

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
