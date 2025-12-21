'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/Button';

export default function HeightScreen() {
    const router = useRouter();
    const [height, setHeight] = useState(170); // cm
    const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
    const [loading, setLoading] = useState(false);

    const cmToFeet = (cm: number) => {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return `${feet}'${inches}"`;
    };

    const handleContinue = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/photos');
        }, 500);
    };

    return (
        <OnboardingLayout progress={40} backHref="/onboarding/interested-in">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    How tall are you?
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    This will be shown on your profile.
                </p>

                {/* Unit Toggle */}
                <div className="flex gap-2 mb-8 p-1 bg-white/60 rounded-full w-fit">
                    <button
                        type="button"
                        onClick={() => setUnit('cm')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${unit === 'cm'
                                ? 'bg-primary text-white'
                                : 'text-secondaryText hover:bg-white/80'
                            }`}
                    >
                        cm
                    </button>
                    <button
                        type="button"
                        onClick={() => setUnit('ft')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${unit === 'ft'
                                ? 'bg-primary text-white'
                                : 'text-secondaryText hover:bg-white/80'
                            }`}
                    >
                        ft/in
                    </button>
                </div>

                {/* Height Display */}
                <div className="text-center mb-8">
                    <div className="text-[64px] font-bold text-primary">
                        {unit === 'cm' ? `${height}` : cmToFeet(height)}
                    </div>
                    <div className="text-secondaryText font-medium">
                        {unit === 'cm' ? 'centimeters' : 'feet & inches'}
                    </div>
                </div>

                {/* Slider */}
                <div className="px-4">
                    <input
                        type="range"
                        min={120}
                        max={220}
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/60 rounded-full appearance-none cursor-pointer accent-primary"
                        style={{
                            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((height - 120) / 100) * 100}%, rgba(255,255,255,0.6) ${((height - 120) / 100) * 100}%, rgba(255,255,255,0.6) 100%)`
                        }}
                    />
                    <div className="flex justify-between text-sm text-secondaryText mt-2">
                        <span>120cm</span>
                        <span>220cm</span>
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
