/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            // Ensure registration_number is synced if stored separately
            const regNo = localStorage.getItem('registration_number');
            if (regNo) {
                userData.registration_number = regNo;
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(userData);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('registration_number');
    };

    const isAdmin = user?.role === 'admin';
    const isStudent = user?.role === 'student';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin, isStudent }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
