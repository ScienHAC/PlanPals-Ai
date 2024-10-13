import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { AuthProvider, useAuth } from './MyComponents/AuthContext'; // Import AuthProvider
// import ProtectedRoute from './Pages/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Now inside the context

  return (
    <Routes>
      <Route path="*" element={<h1>Sorry Page Not Found!!!</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About swag!!</h1>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
