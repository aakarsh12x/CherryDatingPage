import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4D0414',
                accent: '#E53B44',
                textOnDark: '#F5E8D6',
                lightBackground: '#FDF4EE',
                cardBackground: '#F7D8E0',
                success: '#45A846',
                primaryText: '#4D0414',
                secondaryText: '#7A5A61',
                ctaText: '#F5E8D6',
                champagneGold: '#C6A87C',
                gold: '#D4AF37',
                goldLight: '#F9F1D8',
                richRed: '#B30000',
                placeholder: '#9CA3AF',
            },
            fontFamily: {
                sans: ['var(--font-outfit)'],
            },
        },
    },
    plugins: [],
};
export default config;
