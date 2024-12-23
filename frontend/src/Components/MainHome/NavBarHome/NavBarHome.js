import React, { useState } from "react";
import "./navbr.css";
import Logo from "./img/logo.jpg";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
const ClientID =
  "595182290872-kic0nhiove2b1er9ke410u1i5d09iqdc.apps.googleusercontent.com";

function NavBarHome() {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let navigate = useNavigate();

  const onSuccessLogout = () => {
    // Add any necessary logout logic here, such as clearing user data or authentication status
    navigate("/");
  };

  return (
    <div className="nav_barhome">
      <div className="item_nav_bar_new">
        <div>
          <img src={Logo} alt="logonavbr" className="logo_new" />
        </div>
        <div>
          {/* Search bar */}
          <input
            type="text"
            className="search_iput"
            placeholder="Search Here...."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="icon_set_nav_bar">
          <FaBell className="icon_set_nav" />
          <IoMdSettings className="icon_set_nav" />
          <FaUser className="icon_set_nav" />
          <div id="signOutButton" >
            <GoogleLogout
              clientId={ClientID}   
              buttonText="Logout"
              onLogoutSuccess={onSuccessLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarHome;
