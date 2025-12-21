'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/ui/OnboardingLayout';
import { Button } from '@/components/ui/Button';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

export default function PhotosScreen() {
    const router = useRouter();
    const [photos, setPhotos] = useState<(string | null)[]>([null, null, null, null, null, null]);
    const [loading, setLoading] = useState(false);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const activePhotoCount = photos.filter(p => p !== null).length;

    const handlePhotoSelect = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newPhotos = [...photos];
                newPhotos[index] = event.target?.result as string;
                setPhotos(newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = [...photos];
        newPhotos[index] = null;
        setPhotos(newPhotos);
    };

    const handleContinue = async () => {
        if (activePhotoCount < 2) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/onboarding/interests');
        }, 500);
    };

    return (
        <OnboardingLayout progress={48} backHref="/onboarding/height">
            <div className="flex flex-col flex-1">
                <h1
                    className="text-[32px] text-brandDark mb-2 font-bold"
                    style={{ fontFamily: 'var(--font-domine)' }}
                >
                    Show off your best self
                </h1>
                <p className="text-base text-secondaryText mb-6 leading-relaxed font-medium">
                    Upload at least 2 photos to get started.
                </p>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative">
                            <input
                                ref={(el) => { fileInputRefs.current[index] = el; }}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoSelect(index, e)}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => photo ? null : fileInputRefs.current[index]?.click()}
                                className={`w-full aspect-[3/4] rounded-2xl border-2 border-dashed flex items-center justify-center transition-all overflow-hidden ${photo
                                        ? 'border-transparent bg-white'
                                        : 'border-white/80 glass hover:border-champagneGold'
                                    }`}
                            >
                                {photo ? (
                                    <Image
                                        src={photo}
                                        alt={`Photo ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Plus className="text-gray-300" size={32} />
                                )}
                            </button>
                            {photo && (
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <X className="text-white" size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex-1" />

                <Button
                    onClick={handleContinue}
                    disabled={activePhotoCount < 2}
                    loading={loading}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </OnboardingLayout>
    );
}
