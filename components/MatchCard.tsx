'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MatchCardProps {
    id: string;
    name: string;
    age: number;
    photo: string;
}

export function MatchCard({ id, name, age, photo }: MatchCardProps) {
    return (
        <Link
            href={`/profile/${id}`}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-card hover:scale-[1.02] transition-transform"
        >
            <Image
                src={photo}
                alt={name}
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-[17px] drop-shadow-md">
                    {name}, {age}
                </p>
            </div>
        </Link>
    );
}
