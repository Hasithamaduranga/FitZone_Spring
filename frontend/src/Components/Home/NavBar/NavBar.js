import React from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import Logo from "../img/logo.jpg";
const ClientID =
  "595182290872-kic0nhiove2b1er9ke410u1i5d09iqdc.apps.googleusercontent.com";

function NavBar() {
  let navigate = useNavigate();

  const onSuccessLogout = () => {
    // Add any necessary logout logic here, such as clearing user data or authentication status
    navigate("/");
  };

  return (
    <div>
      <div className="item_nav_bar">
        <div>
          <img src={Logo} alt="logo_nav" className="logo" />
        </div>
        <div className="navitem">
          <div>
            <h3 className="item_nav">
              <Link className="nv_lin" to="/home">
                Home
              </Link>
            </h3>
          </div>
          {/* <div>
            <h3 className="item_nav">
              <Link className="nv_lin" to="/postdetails">
                Gallery
              </Link>
            </h3>
          </div> */}
          {/* <div>
            <h3 className="item_nav">
              <Link className="nv_lin" to="/home">
                Workout Plan 
              </Link>
            </h3>
          </div> */}
          {/* <div>
            <h3 className="item_nav">
              <Link className="nv_lin" to="/statushome">
                Workout Status
              </Link>
            </h3>
          </div> */}
          {/* <div>
            <h3 className="item_nav">
              <Link className="nv_lin" to="/meal-home">
                Meal Plan
              </Link>
            </h3>
          </div> */}
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

export default NavBar;
