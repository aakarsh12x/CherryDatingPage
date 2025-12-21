'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/Button';
import { clsx } from 'clsx';

const promptOptions = [
    "A life goal of mine",
    "My simple pleasures",
    "Best travel story",
    "My most controversial opinion",
    "I'm looking for someone who",
    "Two truths and a lie",
    "The way to win me over is",
    "My go-to karaoke song",
];

export default function PromptsScreen() {
    const router = useRouter();
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!selectedPrompt || !answer.trim()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/home');
        }, 500);
    };

    return (
        <OnboardingLayout progress={100} backHref="/onboarding/relationship-goal">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Add a prompt
                </h1>
                <p className="text-base text-secondaryText mb-6 leading-relaxed font-medium">
                    Pick a prompt and write your answer. This helps start conversations!
                </p>

                {!selectedPrompt ? (
                    <div className="space-y-2 overflow-y-auto flex-1">
                        {promptOptions.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => setSelectedPrompt(prompt)}
                                className="w-full text-left py-4 px-5 rounded-[16px] glass border border-white hover:bg-white/80 transition-all"
                            >
                                <span className="text-base font-medium text-primaryText">{prompt}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedPrompt(null);
                                setAnswer('');
                            }}
                            className="text-sm text-champagneGold font-medium mb-4 hover:underline"
                        >
                            ← Choose different prompt
                        </button>

                        <div className="bg-white rounded-[20px] p-5 border border-black/8">
                            <p
                                className="text-lg font-semibold text-brandDark mb-4"
                                style={{ fontFamily: 'var(--font-domine)' }}
                            >
                                {selectedPrompt}
                            </p>
                            <textarea
                                placeholder="Write your answer..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value.slice(0, 200))}
                                rows={4}
                                className="w-full bg-transparent text-base text-primaryText focus:outline-none resize-none font-medium placeholder:text-placeholder"
                                autoFocus
                            />
                            <div className="text-right text-sm text-secondaryText">
                                {answer.length}/200
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-4">
                    <Button
                        onClick={handleContinue}
                        disabled={!selectedPrompt || !answer.trim()}
                        loading={loading}
                        className="w-full"
                    >
                        Finish Profile
                    </Button>
                </div>
            </div>
        </OnboardingLayout>
    );
}
