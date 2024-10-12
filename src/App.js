import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SSEComponent from './MyComponents/Ssecomponent';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
const App = () => {
  return (
    <>
      <Router>
        {/* <SSEComponent /> */}
        <p>WElcome to PlanPals Ai</p>
        <Header />
        <Routes>
          <Route path="*" element={<h1>Sorry Page Not Found!!!</h1>} />
          <Route path="/" element={<h1>Home!!</h1>} />
          <Route path="/about" element={<h1>About swag!!</h1>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

