'use client';
import React from 'react';
import {
    ArrowRight,
    Search,
    Users,
    Share2,
    Shield,
    GanttChartSquare, // заменяем Tree на GanttChartSquare
    Heart
} from 'lucide-react';

interface HomePageProps {
    onViewerClick: () => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

export default function HomePage({ onViewerClick, isAuthenticated, onLogout }: HomePageProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Навигация */}
            <nav className="bg-[#3730A3] text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <span className="font-bold text-xl">Large Family</span>
                        <div className="hidden md:flex space-x-6">
                            <button onClick={onViewerClick} className="text-sm hover:text-blue-200 transition-colors">
                                Семейное дерево
                            </button>
                            <a href="#features" className="text-sm hover:text-blue-200 transition-colors">О нас</a>
                            <a href="#help" className="text-sm hover:text-blue-200 transition-colors">Помощь</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    className="w-48 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <Search className="absolute right-3 top-2.5 h-4 w-4 text-white/60" />
                            </div>
                        </div>
                        {isAuthenticated ? (
                            <button
                                onClick={onLogout}
                                className="px-6 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-full hover:bg-[#4338CA] transition-colors"
                            >
                                Выйти
                            </button>
                        ) : (
                            <button
                                onClick={onViewerClick}
                                className="px-6 py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-full hover:bg-[#4338CA] transition-colors"
                            >
                                Войти
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero секция */}
            <section className="bg-[#3730A3] text-white pt-20 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3730A3] to-[#4F46E5] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Создайте своё <span className="text-blue-300">семейное дерево</span>
                            </h1>
                            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                                Исследуйте свою семейную историю, создавайте и делитесь своим семейным деревом. Сохраните историю для будущих поколений.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={onViewerClick}
                                    className="px-8 py-3 text-base font-medium text-white bg-[#4F46E5] rounded-full hover:bg-[#4338CA] transition-colors flex items-center gap-2"
                                >
                                    Начать <ArrowRight className="h-5 w-5" />
                                </button>
                                <button className="px-8 py-3 text-base font-medium text-white bg-transparent border-2 border-white/20 rounded-full hover:bg-white/10 transition-colors">
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <img
                                src="/images/hero-image.svg"
                                alt="Family Tree"
                                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Статистика */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <StatCard number="1000+" label="Семейных деревьев" icon={<GanttChartSquare />} />
                        <StatCard number="5000+" label="Пользователей" icon={<Users />} />
                        <StatCard number="100%" label="Безопасность" icon={<Shield />} />
                        <StatCard number="24/7" label="Поддержка" icon={<Heart />} />
                    </div>
                </div>
            </section>

            {/* Функции */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши преимущества</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Создавайте, исследуйте и делитесь своей семейной историей с помощью наших инструментов
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#3730A3] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="col-span-2">
                            <h3 className="font-bold text-xl mb-4">Large Family</h3>
                            <p className="text-gray-300 max-w-md">
                                Создавайте и исследуйте свою семейную историю с помощью нашего современного и удобного инструмента.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Навигация</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Главная</a></li>
                                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">О нас</a></li>
                                <li><a href="#help" className="text-gray-300 hover:text-white transition-colors">Помощь</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Контакты</h4>
                            <ul className="space-y-2">
                                <li><a href="mailto:info@largefamily.com" className="text-gray-300 hover:text-white transition-colors">info@largefamily.com</a></li>
                                <li><span className="text-gray-300">+7 (999) 123-45-67</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">&copy; 2024 Large Family. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const StatCard = ({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all">
        <div className="w-12 h-12 bg-[#3730A3] text-white rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
        <div className="text-sm text-gray-600">{label}</div>
    </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all">
        <div className="w-12 h-12 bg-[#3730A3] text-white rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const features = [
    {
        icon: <GanttChartSquare className="h-6 w-6" />, // заменяем Tree на GanttChartSquare
        title: 'Простое создание',
        description: 'Интуитивно понятный интерфейс для создания и редактирования семейного дерева'
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: 'Безопасность',
        description: 'Надежная защита ваших семейных данных и конфиденциальной информации'
    },
    {
        icon: <Share2 className="h-6 w-6" />,
        title: 'Совместная работа',
        description: 'Возможность работать над семейным деревом вместе с родственниками'
    }
];
