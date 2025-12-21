'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/Button';

export default function BirthdayScreen() {
    const router = useRouter();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = day && month && year &&
        parseInt(day) >= 1 && parseInt(day) <= 31 &&
        parseInt(month) >= 1 && parseInt(month) <= 12 &&
        parseInt(year) >= 1920 && parseInt(year) <= 2010;

    const handleContinue = async () => {
        if (!isValid) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/gender');
        }, 500);
    };

    return (
        <OnboardingLayout progress={16} backHref="/onboarding/name">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    When&apos;s your birthday?
                </h1>
                <p className="text-base text-secondaryText mb-10 leading-relaxed font-medium">
                    Your age will be shown on your profile.
                </p>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs text-secondaryText mb-2 font-medium tracking-widest uppercase">
                            Day
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            placeholder="DD"
                            value={day}
                            onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-15 bg-white rounded-[20px] px-6 text-center text-lg font-bold border border-black/8 focus:border-champagneGold focus:border-2 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs text-secondaryText mb-2 font-medium tracking-widest uppercase">
                            Month
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            placeholder="MM"
                            value={month}
                            onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-15 bg-white rounded-[20px] px-6 text-center text-lg font-bold border border-black/8 focus:border-champagneGold focus:border-2 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex-[1.5]">
                        <label className="block text-xs text-secondaryText mb-2 font-medium tracking-widest uppercase">
                            Year
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="YYYY"
                            value={year}
                            onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                            className="w-full h-15 bg-white rounded-[20px] px-6 text-center text-lg font-bold border border-black/8 focus:border-champagneGold focus:border-2 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={!isValid}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
