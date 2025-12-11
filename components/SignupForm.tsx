'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Phone } from 'lucide-react';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        age: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.whatsapp && formData.age) {
            setSubmitted(true);
            console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="signup" className="py-20 px-4 relative overflow-hidden bg-lightBackground">
            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-primary/5"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
                            Join the Waitlist
                        </h2>
                        <p className="text-lg text-secondaryText">
                            Be among the first to experience Cherry when we launch.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Ananya Sharma"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base bg-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="age" className="block text-sm font-semibold text-primary mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        required
                                        min="18"
                                        max="100"
                                        placeholder="25"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary mb-2">
                                    WhatsApp Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondaryText" />
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base bg-white"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary text-ctaText font-bold py-5 rounded-xl shadow-lg hover:shadow-primary/30 transform transition-all duration-300 text-lg flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5 fill-current" />
                                Secure My Spot
                            </motion.button>

                            <p className="text-center text-xs text-secondaryText/70 mt-4">
                                We respect your privacy. No spam, ever.
                            </p>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-success" />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-primary mb-3">
                                Welcome to Cherry! 🍒
                            </h3>
                            <p className="text-lg text-secondaryText mb-6">
                                You&apos;re on the list, {formData.name.split(' ')[0]}! We&apos;ll reach out on WhatsApp soon.
                            </p>
                            <div className="bg-goldLight/50 rounded-xl p-4 text-sm text-secondaryText">
                                We&apos;ll notify you at <strong>{formData.email}</strong>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
