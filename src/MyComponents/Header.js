import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // This will navigate to the /about route
    };
    const handleSignup = () => {
        navigate('/signup'); // This will navigate to the /about route
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Welcome To PlanPals Ai</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="google.com">Disabled</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-success my-2 mx-2 my-sm-0" id="Login_btn" onClick={handleLogin}>Login</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" id="Signup_btn" onClick={handleSignup}>Sign Up</button>
                </div>
            </nav>
        </>
    )
}

export default Header
