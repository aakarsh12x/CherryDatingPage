'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !phoneNumber) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        // Simulate signup - in production, call auth service
        setTimeout(() => {
            setLoading(false);
            router.push('/otp?isSignup=true');
        }, 1000);
    };

    return (
        <div className="min-h-screen gradient-auth flex flex-col">
            <div className="flex-1 px-6 py-8 flex flex-col justify-center max-w-md mx-auto w-full">
                {/* Header */}
                <div className="mb-8">
                    <h1
                        className="text-[32px] text-primary mb-2"
                        style={{ fontFamily: 'var(--font-lobster)' }}
                    >
                        Create Account
                    </h1>
                    <p className="text-base text-secondaryText font-medium">
                        Join Cherry today
                    </p>
                </div>

                {/* Form */}
                <div className="w-full">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="off"
                    />

                    <Input
                        label="Phone Number"
                        placeholder="+1234567890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                    />

                    <Input
                        label="Password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />

                    <Button
                        className="w-full mt-6 mb-4"
                        onClick={handleSignup}
                        loading={loading}
                    >
                        Sign Up
                    </Button>

                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="w-full border-champagneGold"
                        >
                            Already have an account? Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
