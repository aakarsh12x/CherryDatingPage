'use client';

import { motion } from 'framer-motion';
import { Users, Shield } from 'lucide-react';

const stats = [
    { icon: Users, label: 'Waitlist Requests', value: '2,000+' },
    { icon: Shield, label: 'Safety Verified', value: '100%' }
];

const hypeMessages = [
    {
        name: "Ananya S.",
        handle: "@ananya.sharma24",
        text: "Just signed up for the @CherryDating waitlist! The ₹500 refund for boring dates is actually genius 😂 finally someone gets it.",
        platform: "twitter"
    },
    {
        name: "Priya M.",
        handle: "@priya.music_99",
        text: "A dating app that puts women's safety first AND verifies everyone via video? Count me in. 🍒 #CherryDating",
        platform: "twitter"
    },
    {
        name: "Sneha R.",
        handle: "@sneha_reels_07",
        text: "The 'Women First' approach is exactly what we needed. Can't wait for the launch! ✨",
        platform: "twitter"
    }
];

export default function SocialProofSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">

                {/* Stats Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 border-b border-gray-100 pb-12">
                    <div className="text-left max-w-md">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2">The Hype is Real</span>
                        <h3 className="text-3xl font-bold text-primary"> Join the thousands <br /> waiting for Cherry.</h3>
                    </div>

                    <div className="flex gap-6 w-full md:w-auto">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex-1 md:flex-none flex flex-col items-center justify-center p-6 bg-lightBackground rounded-2xl min-w-[150px]">
                                <stat.icon className="w-8 h-8 text-accent mb-2" />
                                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-secondaryText">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hype Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hypeMessages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                                    {msg.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-primary text-sm">{msg.name}</div>
                                    <div className="text-xs text-secondaryText">{msg.handle}</div>
                                </div>
                            </div>
                            <p className="text-secondaryText text-sm leading-relaxed">
                                {msg.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Function definition for CheckCircle is no longer needed as we removed the old review card that used it.
