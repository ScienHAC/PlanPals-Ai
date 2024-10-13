import React, { useState } from 'react';
import { useAuth } from '../MyComponents/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth(); // Use auth context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Include cookies
            });

            const result = await response.json();

            if (response.ok) {
                setIsAuthenticated(true); // Set auth state to true
                setUser(result.user); // Set user data
                setMessage('Signup successful!');
                navigate('/', { replace: true });
            } else {
                setMessage(result.message || 'Signup failed. Please try again.');
            }

            setFormData({ name: '', email: '', password: '' }); // Clear form
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }

        setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
