import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { AuthProvider } from './MyComponents/AuthContext'; // Import AuthProvider
// import ProtectedRoute from './Pages/ProtectedRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        {/* <ProtectedRoute>
          <Logout />
        </ProtectedRoute> */}
        <Routes>
          <Route path="*" element={<h1>Sorry Page Not Found!!!</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About swag!!</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
