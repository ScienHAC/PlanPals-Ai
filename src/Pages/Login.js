import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // State to store the message from the backend
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
            // Send POST request to backend
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json(); // Parse the response JSON

            if (response.ok) {
                // If the request was successful, update the message state
                setMessage(result.message);  // Set the success message from backend
            } else {
                // Handle error messages from backend
                setMessage(result.message || 'Login failed. Please try again.');
            }

            // Clear form fields after submission
            setFormData({
                email: '',
                password: ''
            });

        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.'); // Set a generic error message
        }
        setTimeout(() => {
            setMessage('');
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
                <button type="submit">Login</button>
            </form>

            {/* Display the message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
