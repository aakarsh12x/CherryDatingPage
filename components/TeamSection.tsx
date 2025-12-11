'use client';

import { motion } from 'framer-motion';

const team = [
    {
        name: "Chitranshu Chandel",
        role: "Founder & CEO (IIT Kanpur)",
        bio: "Building the future of safe, meaningful dating. Passionate about solving the loneliness epidemic.",
        image: "/avatar_founder1.jpg" // Placeholder
    },
    {
        name: "Pranjal Mishra",
        role: "CTO",
        bio: "Tech leader ensuring your data is safe and the algorithm actually works for you.",
        image: "/avatar_founder2.jpg" // Placeholder
    }
];

export default function TeamSection() {
    return (
        <section className="py-24 bg-lightBackground border-t border-primary/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-primary mb-4">Meet the Team</h2>
                    <p className="text-secondaryText">The people committed to changing how the world dates.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-12">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="text-center max-w-sm"
                        >
                            <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full overflow-hidden relative border-4 border-primary/10 shadow-lg flex items-center justify-center">
                                {/* Placeholder for real image */}
                                <div className="text-4xl font-bold text-primary/20">
                                    {member.name[0]}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                            <p className="text-accent font-medium mb-3">{member.role}</p>
                            <p className="text-secondaryText leading-relaxed">{member.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
