'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            alert('Please enter your email');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen gradient-auth flex flex-col">
            {/* Header */}
            <header className="px-6 py-4">
                <Link
                    href="/login"
                    className="inline-flex items-center text-primaryText hover:opacity-70 transition-opacity"
                >
                    <ChevronLeft size={24} />
                    <span className="font-medium">Back</span>
                </Link>
            </header>

            <div className="flex-1 px-6 py-8 flex flex-col max-w-md mx-auto w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1
                        className="text-[32px] text-primary mb-2"
                        style={{ fontFamily: 'var(--font-lobster)' }}
                    >
                        Forgot Password
                    </h1>
                    <p className="text-base text-secondaryText font-medium">
                        {sent
                            ? "Check your email for reset instructions"
                            : "Enter your email to reset your password"
                        }
                    </p>
                </div>

                {!sent ? (
                    <div className="w-full">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />

                        <Button
                            className="w-full mt-4"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Send Reset Link
                        </Button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">✉️</span>
                        </div>
                        <p className="text-secondaryText mb-6">
                            We&apos;ve sent password reset instructions to <strong>{email}</strong>
                        </p>
                        <Link href="/login">
                            <Button className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
