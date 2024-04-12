import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  console.log(localStorage.getItem('token'));
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link text-white ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link to="/login" className="btn btn-secondary mx-1">Login</Link>
                <Link to="/signup" className="btn btn-secondary mx-1">Signup</Link>
              </>
            ) : (
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
