import React from 'react'
import { useAuth } from '../MyComponents/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? (
                children
            ) : (
                <h1>Sorry, Page Not Found!!!</h1>
            )}
        </>
    )
}

export default ProtectedRoute
