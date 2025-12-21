'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleLogin = async () => {
        if (!username) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        if (!password) {
            alert('Please enter your password');
            return;
        }

        setLoading(true);
        // Simulate login - in production, call auth service
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/name');
        }, 1000);
    };

    return (
        <div className="min-h-screen gradient-auth flex flex-col">
            <div className="flex-1 px-6 py-8 flex flex-col justify-center max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-[52px] text-richRed mb-2"
                        style={{ fontFamily: 'var(--font-lobster)' }}
                    >
                        Cherry
                    </h1>
                    <p className="text-[17px] text-secondaryText tracking-wide">
                        Find your perfect match
                    </p>
                </div>

                {/* Form */}
                <div className="w-full">
                    <motion.div
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <Input
                            label="Email or Phone"
                            placeholder="Enter email or phone number"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            autoComplete="off"
                        />
                    </motion.div>

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />

                    <div className="flex justify-end mb-6">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-champagneGold font-medium hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        className="w-full mb-6"
                        onClick={handleLogin}
                        loading={loading}
                    >
                        Login
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-champagneGold/50" />
                        <span className="text-champagneGold font-medium tracking-widest text-sm">OR</span>
                        <div className="flex-1 h-px bg-champagneGold/50" />
                    </div>

                    <Link href="/signup">
                        <Button variant="outline" className="w-full border-champagneGold">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
