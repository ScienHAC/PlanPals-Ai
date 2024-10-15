import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check auth state on component mount
    useEffect(() => {
        checkAuthStatus();  // Check if user is authenticated on load
    }, []);

    const checkAuthStatus = async () => {
        try {
            // `${process.env.REACT_APP_hostURL}/api/auth/check-auth`
            const response = await fetch('https://api-planpalsai.vercel.app/api/auth/check-auth', {
                method: 'GET',
                credentials: 'include', // Send cookies with the request
            });

            if (response.ok) {
                const result = await response.json();
                setIsAuthenticated(result.isAuthenticated);
                setUser(result.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to verify auth:', error);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
