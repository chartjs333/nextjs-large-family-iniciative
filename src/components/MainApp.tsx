'use client';
import { useState, useEffect } from 'react';
import FamilyViewer from './FamilyViewer';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

export default function MainApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState<'home' | 'viewer'>('home');

    useEffect(() => {
        const authState = localStorage.getItem('isAuthenticated');
        if (authState === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (success: boolean) => {
        setIsAuthenticated(success);
        localStorage.setItem('isAuthenticated', String(success));
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        setCurrentPage('home');
    };

    const navigateToViewer = () => {
        if (!isAuthenticated) {
            setCurrentPage('viewer');
        } else {
            setCurrentPage('viewer');
        }
    };

    if (!isAuthenticated && currentPage === 'viewer') {
        return <LoginPage onLogin={handleLogin} />;
    }

    if (currentPage === 'home') {
        return (
            <div>
                <HomePage onViewerClick={navigateToViewer} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        На главную
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#9C4F96] rounded-md hover:bg-[#8A458B]"
                    >
                        Logout
                    </button>
                </div>
                <FamilyViewer />
            </div>
        </div>
    );
}