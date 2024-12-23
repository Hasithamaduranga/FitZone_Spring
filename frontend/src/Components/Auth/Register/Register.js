import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });
  const { firstname, lastname, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email already exists in the database
      const checkEmailResponse = await axios.get(
        `http://localhost:8080/user/check-email/${user.email}`
      );

      if (checkEmailResponse.data.exists) {
        // If email exists, show an alert and prevent further registration
        alert("Email already exists. Please use a different email.");
        navigate("/register");
      } else {
        // If email doesn't exist, proceed with registration
        await axios.post("http://localhost:8080/user", user);
        alert("Registration successful! You can now log in.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };
  return (
    <div>
      <div className="bgreg">
        <div className="pdn_bb">
          <br /> <br /> <br /> <br />
          <div className="rightbox_auth_reg">
            <div>
              <form onSubmit={onSubmit} className="form_suth">
                <div className="form_group">
                  <h3 className="log_name">Register Now</h3>
                  <div className="form_group">
                    <label className="form_lable_auth">First name</label>
                    <input
                      type="text"
                      className="frominput_auth"
                      placeholder="First Name"
                      name="firstname"
                      required
                      value={firstname}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="form_group">
                    <label className="form_lable_auth">Last Name</label>
                    <input
                      type="text"
                      className="frominput_auth"
                      placeholder="Last Name"
                      name="lastname"
                      required
                      value={lastname}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="form_group">
                    <label className="form_lable_auth">Email</label>
                    <input
                      type="email"
                      className="frominput_auth"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="form_group">
                    <label className="form_lable_auth">Password</label>
                    <input
                      type="password"
                      required
                      className="frominput_auth"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="form_group">
                    <label className="form_lable_auth">phone</label>
                    <input
                      type="text"
                      required
                      className="frominput_auth"
                      placeholder="Phone  Number"
                      name="phone"
                      value={phone}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btnbtnlog">
                      LogIn
                    </button>
                    <p className="noacc">
                      Have an account
                      <Link to="/" className="lk">click to Login</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
