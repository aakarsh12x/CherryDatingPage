'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, CheckCircle, Heart } from 'lucide-react';

export default function FeatureTeasers() {
    const features = [
        {
            icon: Heart,
            title: 'Women First',
            description: 'Designed exclusively for women to feel safe and in control. You act, they react. Your comfort is our non-negotiable priority.',
            color: 'bg-primary/10'
        },
        {
            icon: Sparkles,
            title: '₹500 Boring Date Refund',
            description: 'Bad date? It happens. Boring date? Not on our watch. If your date is a snooze, we refund you ₹500. Literally.',
            color: 'bg-accent/10'
        },
        {
            icon: Shield,
            title: 'Ironclad Safety',
            description: 'Government ID verification, live video selfies, and on-date SOS alerts. We verify everyone so you can date without fear.',
            color: 'bg-champagneGold/20'
        }
    ];

    return (
        <section className="py-24 px-4 relative bg-white">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">
                        Why Choose Cherry?
                    </h2>
                    <p className="text-xl text-secondaryText max-w-2xl mx-auto">
                        We&apos;ve reimagined dating to be safer, smarter, and more meaningful.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="relative bg-lightBackground p-10 rounded-3xl border border-primary/5 hover:border-primary/20 transition-all duration-300 h-full">
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                                <p className="text-secondaryText text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
