'use client';

import { motion } from 'framer-motion';

export default function NarrativeSection() {
    return (
        <section className="py-24 bg-primary text-textOnDark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.png')] bg-repeat" /> {/* Fallback or texture if needed */}

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-8 text-gold"
                >
                    Why We Built Cherry
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-lg md:text-xl leading-relaxed font-light"
                >
                    <p>
                        We built Cherry because dating as a woman has become exhausting. The creeps, the endless swiping, and the fear of who might actually show up.
                    </p>
                    <p>
                        We decided to change the rules. Cherry is a <strong>Women First</strong> platform where your safety isn&apos;t just a feature—it&apos;s the foundation. We are so confident in our vetting that we offer a <strong>₹500 refund</strong> if you have a boring date.
                    </p>
                    <p className="font-medium text-white">
                        Because you deserve dates that are safe, exciting, and worth your time.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
