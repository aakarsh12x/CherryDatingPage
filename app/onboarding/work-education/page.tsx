'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function WorkEducationScreen() {
    const router = useRouter();
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [education, setEducation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/lifestyle');
        }, 500);
    };

    return (
        <OnboardingLayout progress={64} backHref="/onboarding/interests">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    What do you do?
                </h1>
                <p className="text-base text-secondaryText mb-8 leading-relaxed font-medium">
                    Tell us a bit about your work and education.
                </p>

                <Input
                    label="Job Title"
                    placeholder="e.g. Software Engineer"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                />

                <Input
                    label="Company"
                    placeholder="e.g. Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <Input
                    label="Education"
                    placeholder="e.g. Stanford University"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                />

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
