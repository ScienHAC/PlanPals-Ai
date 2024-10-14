// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { AuthProvider, useAuth } from './MyComponents/AuthContext';
import ProtectedRoute from './Pages/ProtectedRoute';
import ProjectPage from './Components/ProjectPage';
import { useState, useEffect } from 'react';
const AppRoutes = ({ validProjects }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About swag!!</h1>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />

      {/* Dynamically generated project routes */}
      {validProjects.map((project) => (
        <Route
          key={project}
          path={`/${project}`}
          element={
            <ProtectedRoute>
              <ProjectPage projectTitle={project} />
            </ProtectedRoute>
          }
        />
      ))}

      {/* 404 Page for unmatched routes */}
      <Route path="*" element={<h1>Sorry, Page Not Found!!!</h1>} />
    </Routes>
  );
};

const App = () => {
  const [validProjects, setValidProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const eventSource = new EventSource('http://localhost:5000/api/projectdata', {
        withCredentials: true,
      });
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setValidProjects(data.map((project) => project.uri));
        } catch (error) {
          console.error('Failed to parse data:', event.data);
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    };
    fetchProjects();
  },);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes validProjects={validProjects} />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
