'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "How does the 'Boring Date Refund' work?",
        answer: "We are so confident in our matching that if you have a genuinely boring date, we refund you ₹500. No questions asked. Your time is valuable, and we respect that."
    },
    {
        question: "What does 'Women First' mean on Cherry?",
        answer: "It means we prioritize women's safety, comfort, and control. From strict verification to the 'SOS' button, every feature is designed to make women feel secure and empowered."
    },
    {
        question: "How do you ensure safety?",
        answer: "We have a 3-step verification process (Government ID + Video Selfie), real-time location sharing during dates, and an emergency SOS button that alerts our team and your trusted contacts immediately."
    },
    {
        question: "Is Cherry really free?",
        answer: "Yes! Cherry is currently free to join for early access members. We will introduce premium features later, but joining the waitlist locks in your early bird status."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-lightBackground">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-primary text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-lg font-bold text-primary">{faq.question}</span>
                                {openIndex === i ? (
                                    <ChevronUp className="text-accent" />
                                ) : (
                                    <ChevronDown className="text-secondaryText" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-secondaryText leading-relaxed border-t border-gray-50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
