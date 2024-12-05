'use client';
import { useState, useEffect } from 'react';
import FamilyViewer from './FamilyViewer';
import LoginPage from './LoginPage';

export default function MainApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    };

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#9C4F96] rounded-md hover:bg-[#8A458B]"
                    >
                        Выйти
                    </button>
                </div>
                <FamilyViewer />
            </div>
        </div>
    );
}