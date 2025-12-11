'use client';

import { motion } from 'framer-motion';
import { Star, Users, Heart, Calendar, Shield } from 'lucide-react';

const stats = [
    { icon: Users, label: 'Waitlist Requests', value: '2,000+' },
    { icon: Heart, label: 'Launch City', value: 'Lucknow' },
    { icon: Shield, label: 'Safety Verified', value: '100%' }
];

const reviews = [
    {
        name: "Riya S.",
        role: "Verified Member",
        image: "/avatar1.jpg", // Placeholder
        text: "Finally, a dating app that actually saves me time. The matches are spot on!",
        rating: 5
    },
    {
        name: "Arjun K.",
        role: "Verified Member",
        image: "/avatar2.jpg", // Placeholder
        text: "I love the booking feature. No more back and forth texting, just actual dates.",
        rating: 5
    },
    {
        name: "Mira P.",
        role: "Verified Member",
        image: "/avatar3.jpg", // Placeholder
        text: "Feels so much safer knowing everyone is verified. Highly recommend.",
        rating: 5
    }
];

export default function SocialProofSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-gray-100 pb-12">
                    <div className="col-span-2 md:col-span-1 flex flex-col justify-center text-left">
                        <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Be The First</span>
                        <h3 className="text-3xl font-bold text-primary"> Join the exclusive <br /> waitlist.</h3>
                    </div>
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-4 bg-lightBackground rounded-2xl">
                            <stat.icon className="w-8 h-8 text-accent mb-2" />
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-secondaryText">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex gap-1 text-gold mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-secondaryText mb-6 italic">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                                    {/* Placeholder for avatar */}
                                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {review.name[0]}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary">{review.name}</h4>
                                    <span className="text-xs text-success flex items-center gap-1">
                                        <CheckCircle size={10} /> {review.role}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CheckCircle({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}
