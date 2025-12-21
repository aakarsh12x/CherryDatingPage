'use client';

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

function OTPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSignup = searchParams.get('isSignup') === 'true';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length !== 6) {
            alert('Please enter the complete 6-digit code');
            return;
        }

        setLoading(true);
        // Simulate verification
        setTimeout(() => {
            setLoading(false);
            if (isSignup) {
                router.push('/onboarding/name');
            } else {
                router.push('/home');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen gradient-auth flex flex-col">
            <div className="flex-1 px-6 py-8 flex flex-col justify-center max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-[32px] text-primary mb-2"
                        style={{ fontFamily: 'var(--font-lobster)' }}
                    >
                        Verify Your Phone
                    </h1>
                    <p className="text-base text-secondaryText font-medium">
                        Enter the 6-digit code we sent to your phone
                    </p>
                </div>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 text-center text-2xl font-bold bg-white rounded-xl border border-black/10 focus:border-primary focus:border-2 focus:outline-none transition-all"
                        />
                    ))}
                </div>

                <Button
                    className="w-full mb-4"
                    onClick={handleVerify}
                    loading={loading}
                >
                    Verify
                </Button>

                <button
                    className="text-champagneGold font-medium text-center hover:underline"
                    onClick={() => alert('Code resent!')}
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen gradient-auth flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <OTPContent />
        </Suspense>
    );
}

