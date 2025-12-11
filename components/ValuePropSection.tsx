'use client';

import { motion } from 'framer-motion';

export default function ValuePropSection() {
    return (
        <section className="py-20 bg-white border-y border-primary/5">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-primary leading-relaxed font-serif italic"
                >
                    &quot;We curate matches, verify profiles, and handle the booking. <br className="hidden md:block" /> All you have to do is show up.&quot;
                </motion.h2>
            </div>
        </section>
    );
}
