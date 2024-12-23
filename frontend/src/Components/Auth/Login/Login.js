import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
const ClientID =
  "595182290872-kic0nhiove2b1er9ke410u1i5d09iqdc.apps.googleusercontent.com";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", user);

      if (response.status === 200 && response.data) {
        alert("Login successful");
        navigate("/home");
      } else {
        console.log("Invalid credentials");
        alert("Invalid credentials. Please enter correct details.");
      }
    } catch (error) {
      console.error("Error while sending data to the server:", error.response);
      alert("An error occurred. Please try again.");
    }
  };

  const onSuccess = (res) => {
    console.log("login successful", res.profileObj);
    navigate("/home");
  };

  const onFailure = (error) => {
    console.error("Google login failed:", error);
    console.log("Google login failed. Please try again.");
  };

  useEffect(() => {
    const initAuth2 = async () => {
      try {
        await gapi.load("client:auth2");
        await gapi.auth2.init({ client_id: ClientID });
      } catch (error) {
        console.error("Error initializing Google Auth:", error);
      }
    };

    initAuth2();
  }, []);

  return (
    <div>
      <div className="bglog">
        <div className="pdn_bb">
          <div className="rightbox_auth">
            <div>
              <form onSubmit={onSubmit} className="form_suth">
                <div className="form_group">
                  <h3 className="log_name">Login Now</h3>
                  <label className="form_lable_auth">Email</label>
                  <br />
                  <input
                    type="email"
                    required
                    className="frominput_auth"
                    name="email"
                    onChange={onInputChange}
                  />
                </div>
                <div className="form_group">
                  <label className="form_lable_auth">password</label>
                  <br />
                  <input
                    type="password"
                    required
                    className="frominput_auth"
                    name="password"
                    onChange={onInputChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btnbtnlog">
                    LogIn
                  </button>
                  <div className="btn_g">
                    <div id="signInButton" className="goglbtn">
                      <GoogleLogin
                      className="btng"
                        clientId={ClientID}
                        buttonText="Login With Google Account"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                      />
                    </div>
                  </div>

                  <p className="noacc">
                    Don't Have an account  
                    <Link to="/regi" className="lk">Click to register</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
