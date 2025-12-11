'use client';

import { Heart, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12 px-4 bg-primary text-textOnDark">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Brand */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <Heart className="w-6 h-6 text-accent fill-current" />
                        <span className="text-2xl font-bold">Cherry</span>
                    </div>
                    <p className="text-ctaText/60 text-sm max-w-xs">
                        Dating, but sweeter. Experience the future of meaningful connections.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-8 text-sm font-medium text-ctaText/80">
                    <a href="#" className="hover:text-accent transition-colors">About Us</a>
                    <a href="#" className="hover:text-accent transition-colors">Careers</a>
                    <a href="#" className="hover:text-accent transition-colors">Blog</a>
                </div>

                {/* Socials */}
                <div className="flex gap-6">
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Instagram size={20} className="text-ctaText" />
                    </a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Twitter size={20} className="text-ctaText" />
                    </a>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <Linkedin size={20} className="text-ctaText" />
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ctaText/40">
                <p>&copy; {new Date().getFullYear()} Cherry Dating. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-ctaText transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-ctaText transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-ctaText transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}
