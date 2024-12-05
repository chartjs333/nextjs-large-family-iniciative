'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Навигация */}
            <nav className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <img src="/logo.svg" alt="GP2 Logo" className="h-8" />
                        <div className="hidden md:flex space-x-6">
                            <a href="#" className="text-sm hover:text-blue-400">Research Community</a>
                            <a href="#" className="text-sm hover:text-blue-400">Training</a>
                            <a href="#" className="text-sm hover:text-blue-400">Data Resources</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero секция */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Uncovering the Genetic Architecture of Disease
                        </h1>
                        <p className="text-lg text-slate-600 mb-8">
                            An ambitious program to generate raw data and collaborate with researchers worldwide to better understand the genetic architecture of disease.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-blue-500/10 rounded-2xl aspect-[3/4] overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-b from-blue-600/20 to-blue-900/40" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Статистика */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatCard number="54" label="Teams" color="bg-emerald-500" />
                    <StatCard number="12K" label="Samples Collected" color="bg-blue-500" />
                    <StatCard number="0K" label="Samples Ingested" color="bg-blue-600" />
                    <StatCard number="0" label="Organizational Members" color="bg-purple-500" />
                </div>
            </section>

            {/* Новости */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold mb-8">Latest GP2 News</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {newsItems.map((item, i) => (
                        <NewsCard key={i} {...item} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex justify-between items-center">
                        <p className="text-sm">We're enabling science to go further, faster, and at a greater scale. Join us.</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                            Get Started
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const StatCard = ({ number, label, color }: { number: string; label: string; color: string }) => (
    <div className={`${color} text-white rounded-xl p-6 text-center`}>
        <div className="text-3xl font-bold mb-2">{number}</div>
        <div className="text-sm opacity-90">{label}</div>
    </div>
);

const NewsCard = ({ title, date, image }: { title: string; date: string; image: string }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{date}</p>
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                Learn More <ArrowRight size={16} />
            </button>
        </div>
    </div>
);

const newsItems = [
    {
        title: "GP2 Awarded The Neuro's and Hugo Cooper Foundation Open Science Prize",
        date: "November 17, 2023",
        image: "/news1.jpg"
    },
    {
        title: "Request for Information from Researchers in the Middle East and North Africa",
        date: "January 16, 2024",
        image: "/news2.jpg"
    },
    {
        title: "The Components of GP2's 8th Data Release",
        date: "February 1, 2024",
        image: "/news3.jpg"
    }
];