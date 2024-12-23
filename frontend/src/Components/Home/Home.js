import React from "react";
import NavBar from "../Home/NavBar/NavBar";
import "./home.css";
import Footer from "./Footer/Footer";
function Home() {
  return (
    <div>
      <NavBar />
      <div className="back_home_img">
        <div className="content_home">
          <h1 className="fadeInUp">
            FIT
            <br />
            <i>
              <span className="subtopic">ZONE</span>
            </i>
          </h1>

          <p className="fitpara fadeInUp">
            Your ultimate destination <br />
            for fitness, health, and wellness..!
          </p>
          <button
            className="strtbtn fadeInUp"
            onClick={() => (window.location.href = "/postdetails")} 
          >
            Get Start
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
