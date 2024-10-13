import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SSEComponent from './MyComponents/Ssecomponent';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
const App = () => {
  return (
    <>
      <Router>
        {/* <SSEComponent /> */}
        <Header />
        <Routes>
          <Route path="*" element={<h1>Sorry Page Not Found!!!</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About swag!!</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

