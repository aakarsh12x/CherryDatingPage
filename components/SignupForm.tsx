'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Heart, Phone, User, Mail, Calendar, ChevronDown } from 'lucide-react';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
        gender: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isGenderOpen, setIsGenderOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Form ID for the Google Form
        /* 
           Ideally, you would replace this with the actual Google Form Action URL. 
           To get this: 
           1. Create a Google Form.
           2. Get the "pre-filled link".
           3. Inspect the form submission to get entry IDs (like entry.123456).
           4. Use a hidden iframe to submit without redirecting.
        */

        // For now, we will assume submission to a generic endpoint or valid structure.
        // Since we don't have the specific Google Form URL and field IDs from the user, 
        // we will keep the submission logic ready to be plugged in.

        if (formData.name && formData.email && formData.whatsapp && formData.age && formData.gender) {

            // Simulating a network request delay
            await new Promise(resolve => setTimeout(resolve, 800));

            setSubmitted(true);
            console.log('Form submitted:', formData);

            // Example of how the real submission code would look:
            /*
            const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
            const formBody = new FormData();
            formBody.append("entry.123456", formData.name);
            formBody.append("entry.234567", formData.email);
            // ... etc
            
            await fetch(googleFormUrl, { method: 'POST', body: formBody, mode: 'no-cors' });
            */
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="signup" className="py-24 px-4 relative overflow-hidden bg-lightBackground">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60 -z-10" />

            <div className="max-w-xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-2xl mb-6 text-primary">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 tracking-tight">
                            Join the Waitlist
                        </h2>
                        <p className="text-lg text-secondaryText font-medium">
                            Your better dating life starts here.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                {/* Name Input */}
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-gray-400'}`}>
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-11 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Age & Gender Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative group">
                                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'age' ? 'text-primary' : 'text-gray-400'}`}>
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="number"
                                            name="age"
                                            required
                                            min="18"
                                            max="99"
                                            placeholder="Age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('age')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full pl-11 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'gender' ? 'text-primary' : 'text-gray-400'}`}>
                                            <User className="h-5 w-5" />
                                        </div>

                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsGenderOpen(!isGenderOpen)}
                                                onBlur={() => setTimeout(() => setIsGenderOpen(false), 200)}
                                                className={`w-full pl-11 pr-10 py-4 bg-white border-2 rounded-2xl outline-none text-left font-medium transition-all flex items-center justify-between ${isGenderOpen ? 'border-primary/20 ring-4 ring-primary/5' : 'border-gray-100'
                                                    }`}
                                            >
                                                <span className={`${formData.gender ? 'text-primary' : 'text-gray-400'}`}>
                                                    {formData.gender || 'Gender'}
                                                </span>
                                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isGenderOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {isGenderOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2"
                                                    >
                                                        {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, gender: option });
                                                                    setIsGenderOpen(false);
                                                                }}
                                                                className="w-full text-left px-6 py-3 text-primary font-medium hover:bg-primary/5 transition-colors flex items-center justify-between group/option"
                                                            >
                                                                {option}
                                                                {formData.gender === option && (
                                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Input */}
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'whatsapp' ? 'text-primary' : 'text-gray-400'}`}>
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        required
                                        placeholder="WhatsApp Number"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('whatsapp')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-11 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-gray-400'}`}>
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-11 pr-5 py-4 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-primary font-medium placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary text-ctaText font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transform transition-all duration-300 text-lg flex items-center justify-center gap-3 mt-8"
                            >
                                <span>Get Early Access</span>
                                <div className="bg-white/20 rounded-full p-1">
                                    <Heart className="w-4 h-4 fill-current" />
                                </div>
                            </motion.button>

                            <p className="text-center text-xs text-secondaryText/60 font-medium">
                                🔒 Your data is encrypted and never shared.
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
                                className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-12 h-12 text-success" />
                            </motion.div>
                            <h3 className="text-3xl font-bold text-primary mb-3">
                                You&apos;re In! 🍒
                            </h3>
                            <p className="text-lg text-secondaryText mb-8 max-w-xs mx-auto">
                                Thanks {formData.name.split(' ')[0]}. We&apos;ve sent a confirmation to your WhatsApp.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-sm font-bold text-primary hover:text-accent transition-colors underline"
                            >
                                Register another person
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
