import React, { useState } from 'react';
import { useAuth } from '../MyComponents/AuthContext'; // Import useAuth from AuthContext
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth(); // Use auth context
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for loading

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await fetch(`${process.env.hostURL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Send and store cookies
            });

            const result = await response.json();

            if (response.ok) {
                setIsAuthenticated(true); // Update auth state to true
                setUser(result.user); // Set user data from the backend
                setMessage('Login successful!'); // Set success message
                navigate('/', { replace: true });
            } else {
                setMessage(result.message || 'Login failed. Please try again.');
            }

            setFormData({ email: '', password: '' }); // Clear form

        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }

        setTimeout(() => {
            setMessage(''); // Clear message after 2 seconds
        }, 2000);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    className="btn btn-outline-success my-2 my-sm-0"
                    disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Display loading state */}
            {loading && <p>Loading...</p>}

            {/* Display the message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
