import React, { useState, useEffect } from 'react';
import { useAuth } from '../MyComponents/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = ({ setValidProjects }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added for loading state

    // Clear message after 3 seconds
    const clearMessage = () => setTimeout(() => setMessage(''), 3000);

    // Fetch user details using useCallback to avoid unnecessary re-renders
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5000/user-name', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching user data
            }
        };
        if (isAuthenticated) fetchUser();
    }, [isAuthenticated, setValidProjects, location]);

    // Fetch projects with useCallback to avoid re-creating the function
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/projectdata', {
            withCredentials: true,
        });

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setProjects(data); // Update the projects list dynamically
                setValidProjects(data.map((project) => project.uri)); // Sync valid projects with App.js
            } catch (error) {
                // console.error('Failed to parse data:', event.data);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            setMessage('Connection lost, attempting to reconnect...');
            eventSource.close();
        };

        return () => {
            eventSource.close(); // Cleanup on component unmount
        };
    }, [isAuthenticated, setValidProjects, location]);
    // Call fetchUser and fetchProjects on mount and route change

    // Add a new project
    const addProject = async () => {
        const newProject = projectTitle.trim() || `Untitled ${projects.length + 1}`;
        setProjectTitle('');
        setShowInput(false);

        try {
            const response = await fetch('http://localhost:5000/api/userproject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uri: newProject }),
                credentials: 'include',
            });
            const result = await response.json();

            if (response.ok) {
                if (result.exists) {
                    setMessage(`Project "${newProject}" already exists.`);
                } else {
                    navigate(`/${newProject}`, { replace: true });
                }
            } else {
                setMessage(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Failed to create project:', error);
            setMessage('Error: Unable to create project.');
        } finally {
            clearMessage();
        }
    };


    return (
        <>
            {isAuthenticated ? (
                <>
                    <h1>Welcome, {username}</h1>

                    {isLoading ? (
                        <div>Loading...</div> // Display loading indicator while data fetches
                    ) : (
                        <>
                            {showInput ? (
                                <div>
                                    <input
                                        type="text"
                                        value={projectTitle}
                                        onChange={(e) => setProjectTitle(e.target.value)}
                                        placeholder="Enter project title"
                                    />
                                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={addProject}>Submit</button>
                                </div>
                            ) : (
                                <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => setShowInput(true)}>Create</button>
                            )}

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                                {projects.map((project, index) => (
                                    <button
                                        key={index}
                                        onClick={() => navigate(`/${project.uri}`, { replace: true })}
                                        style={{
                                            minWidth: '120px',
                                            minHeight: '50px',
                                            fontSize: '18px',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: '#6200ea',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {project.uri}
                                    </button>
                                ))}
                            </div>
                            {message && <p style={{ color: 'red' }}>{message}</p>}
                        </>
                    )}
                </>
            ) : (
                <h1>PlanPals.ai</h1>
            )}
        </>
    );
};

export default Home;