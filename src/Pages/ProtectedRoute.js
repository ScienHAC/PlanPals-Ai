import React from 'react'
import { useAuth } from '../MyComponents/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? (
                children
            ) : (
                <h1>You are not logged in</h1>
            )}
        </>
    )
}

export default ProtectedRoute
