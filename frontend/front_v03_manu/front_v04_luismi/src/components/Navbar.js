import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../http/api";
import "../css/Navbar.css";
import ShowToLoggedInUsers from "./ShowToLoggedInUser";
import ShowToGuestUsers from "./ShowToGuestUser";
import ShowToLoggedInUserHotel from "./ShowToLoggedInUserHotel";
import Dropdown from "./Dropdown";
import useAuth from "../shared/hooks/useAuth";

function Navbar() {
  const { signOut, userData } = useAuth();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [profileData, setprofileData] = useState([]);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

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

  useEffect(() => {
    if (userData) {
      getUserInfo(userData.id).then((data) => {
        setprofileData(data);
      });
    }
  }, [userData]);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img className="logoParlor" src="images/logoParlor.png" alt="" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <ShowToGuestUsers>
                <Link
                  to="/sign-up/hotel"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Register your spaces
                </Link>
              </ShowToGuestUsers>
            </li>
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <ShowToGuestUsers>
                <Link className="nav-links" onClick={closeMobileMenu}>
                  <i class="fas fa-user-circle" />{" "}
                  <i className="fas fa-caret-down" />
                </Link>
                {dropdown && <Dropdown />}
              </ShowToGuestUsers>

              <ShowToLoggedInUsers>
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {profileData.nombre} {profileData.apellidos}
                </Link>
              </ShowToLoggedInUsers>

              <ShowToLoggedInUserHotel>
                <Link
                  to="/hotels/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {profileData.nombre} {profileData.apellidos}
                </Link>
              </ShowToLoggedInUserHotel>
            </li>
            <ShowToLoggedInUsers>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={signOut}>
                  <i class="fas fa-power-off"></i>
                </Link>
              </li>
            </ShowToLoggedInUsers>

            <ShowToLoggedInUserHotel>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={signOut}>
                  <i class="fas fa-power-off"></i>
                </Link>
              </li>
            </ShowToLoggedInUserHotel>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
