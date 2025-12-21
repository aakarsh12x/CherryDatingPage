'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function WelcomePage() {
    const [scale, setScale] = useState(1);

    // Heartbeat animation
    useEffect(() => {
        const interval = setInterval(() => {
            setScale(1.2);
            setTimeout(() => setScale(1), 150);
            setTimeout(() => setScale(1.2), 300);
            setTimeout(() => setScale(1), 450);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen gradient-warm flex flex-col items-center px-6 py-8">
            {/* Logo */}
            <div className="mt-16 mb-10">
                <motion.div
                    animate={{ scale }}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                >
                    <Heart
                        className="text-red-600 fill-red-600"
                        size={60}
                    />
                </motion.div>
            </div>

            {/* Taglines */}
            <div className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    className="text-[38px] font-extrabold text-primaryText leading-tight tracking-tight"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                >
                    Skip the texting.
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-[38px] font-extrabold text-primaryText leading-tight tracking-tight"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                >
                    Meet the person.
                </motion.h1>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA Button */}
            <div className="w-full max-w-md">
                <Link href="/login">
                    <Button className="w-full bg-[#1F4F5B]">
                        Continue with phone
                    </Button>
                </Link>

                <p className="text-center text-secondaryText text-sm mt-4 font-medium">
                    LinkedIn login required
                </p>
            </div>
        </div>
    );
}
