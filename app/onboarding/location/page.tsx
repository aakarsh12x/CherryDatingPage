'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

export default function LocationScreen() {
    const router = useRouter();
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [detecting, setDetecting] = useState(false);

    const handleDetectLocation = () => {
        setDetecting(true);
        // Simulate location detection
        setTimeout(() => {
            setCity('Mumbai, India');
            setDetecting(false);
        }, 1500);
    };

    const handleContinue = async () => {
        if (!city) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/relationship-goal');
        }, 500);
    };

    return (
        <OnboardingLayout progress={88} backHref="/onboarding/bio">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Where are you located?
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    This helps us find matches near you.
                </p>

                {/* Auto-detect button */}
                <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={detecting}
                    className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-[20px] glass border border-white mb-4 hover:bg-white/80 transition-all"
                >
                    <MapPin className="text-primary" size={20} />
                    <span className="font-medium text-primaryText">
                        {detecting ? 'Detecting location...' : 'Use my current location'}
                    </span>
                </button>

                <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-px bg-black/10" />
                    <span className="text-secondaryText text-sm font-medium">or enter manually</span>
                    <div className="flex-1 h-px bg-black/10" />
                </div>

                <Input
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={!city}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
