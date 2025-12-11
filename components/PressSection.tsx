'use client';

import { motion } from 'framer-motion';

const press = [
    {
        name: "TechDaily",
        quote: "Cherry is revolutionizing the dating scene with its safety-first approach."
    },
    {
        name: "ModernLove",
        quote: "Finally, an app that focuses on getting you off the phone and on a date."
    },
    {
        name: "CityLife",
        quote: "The most premium dating experience we've seen this year."
    }
];

export default function PressSection() {
    return (
        <section className="py-16 border-y border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">As featured in</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {press.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <h4 className="text-xl font-black text-gray-300 mb-4">{item.name}</h4>
                            <p className="text-secondaryText/80 text-sm italic">&quot;{item.quote}&quot;</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
