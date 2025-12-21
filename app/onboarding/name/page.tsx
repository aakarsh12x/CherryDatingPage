'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function NameScreen() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!firstName.trim()) return;

        setLoading(true);
        // In production, save to backend
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/birthday');
        }, 500);
    };

    return (
        <OnboardingLayout progress={8} backHref="/login">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    What should we call you?
                </h1>
                <p className="text-base text-secondaryText mb-10 leading-relaxed font-medium">
                    This is how you&apos;ll appear on Cherry.
                </p>

                <Input
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                />

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={!firstName.trim()}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
