import React, { useState } from 'react';
import { useAuth } from '../MyComponents/AuthContext'; // Import useAuth from AuthContext
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { setIsAuthenticated, setUser } = useAuth(); // Destructure setIsAuthenticated and setUser
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to backend for logout
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include credentials to send cookies
            });

            const result = await response.json();

            if (response.ok) {
                // Clear auth state in context
                setIsAuthenticated(false); // Set authentication state to false
                setUser(null); // Clear user data
                setMessage(result.message); // Display success message

                // Redirect to homepage with replace to avoid going back
                navigate('/', { replace: true });
            } else {
                setMessage(result.message || 'Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }

        // Clear message after 2 seconds (optional)
        setTimeout(() => {
            setMessage('');
        }, 2000);
    };

    return (
        <div>
            <button
                className="btn btn-outline-success my-2 mx-2 my-sm-0"
                id="Logout_btn"
                onClick={handleLogout}
            >
                Logout
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Logout;
