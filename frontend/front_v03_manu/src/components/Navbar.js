import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "../css/Navbar.css";
import ShowToLoggedInUsers from "./ShowToLoggedInUser";
import ShowToGuestUsers from "./ShowToGuestUser";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Gestion <i className="fas fa-hotel" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/hotels"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Hotels
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/spaces"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Spaces
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contactus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <ShowToGuestUsers>
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </ShowToGuestUsers>
              <ShowToLoggedInUsers>
                <Link
                  to="/profile"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Usuario
                </Link>
              </ShowToLoggedInUsers>
            </li>
          </ul>
          {button && (
            <>
              <ShowToGuestUsers>
                <Link to="/sign-up">
                  <Button buttonStyle="btn--outline">Sign Up</Button>
                </Link>
              </ShowToGuestUsers>
              <ShowToLoggedInUsers>
                <Link to="/profile">Usuario</Link>
              </ShowToLoggedInUsers>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
