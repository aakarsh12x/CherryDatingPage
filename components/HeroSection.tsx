'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

export default function HeroSection() {
    const scrollToSignup = () => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[95vh] flex items-center bg-lightBackground overflow-hidden">
            {/* Decorative thin border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-primary/5" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Column: Typography & CTA */}
                <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-white mb-8"
                    >
                        <Star className="w-3 h-3 text-primary fill-current" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary">The Application is Open</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-primary leading-[0.9] mb-8"
                    >
                        Dating, <br />
                        <span className="italic font-serif font-light text-accent">Elevated.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-secondaryText max-w-lg leading-relaxed mb-10"
                    >
                        Curated matches. Verified profiles. Bespoke dates. <br className="hidden md:block" />
                        We handle the details, so you can focus on the connection.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <motion.button
                            onClick={scrollToSignup}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-8 py-4 bg-primary text-ctaText rounded-full text-lg font-medium overflow-hidden shadow-2xl transition-all"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-3">
                                Join the Waitlist
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <p className="text-xs text-secondaryText/60 mt-4 sm:mt-0 font-medium">
                            Limited spots available this month.
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Premium Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="order-1 lg:order-2 relative hidden lg:block"
                >
                    {/* Main "Card" Image */}
                    <div className="relative z-10 w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary/5">
                        <Image
                            src="/hero_image.png"
                            alt="Cherry Moment"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Overlay Gradient for Text Readability if needed, though clean is better */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40" />

                        {/* Mock UI Element Overlay */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    AD
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-primary">Aditya & Diya</div>
                                    <div className="text-xs text-secondaryText">Matched 2 days ago</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full uppercase tracking-wider">Coffee Date</span>
                                <span className="text-[10px] font-bold text-success px-3 py-1 bg-success/10 rounded-full uppercase tracking-wider">Verified</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Elements behind */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
