import React from "react";
import NavBar from "../../Home/NavBar/NavBar";
import "./status.css";
import Footer from "../../Home/Footer/Footer";
function StatusHome() {
  return (
    <div>
      <NavBar />
      <div className="workoutstatus_home">
        <div className="details_box">
          <h3 className="details_topc fadeInUp">
            "The Real <span className="details_sub_topc">Workouts Starts</span>{" "}
            When You Wans To <span className="details_sub_topc">Stop</span>"
          </h3>
          <p className="para fadeInUp">
            - Start Your Future Body With{" "}
            <span className="topic_para">FITZONE</span> -{" "}
          </p>
          <button
            onClick={() => (window.location.href = "/posthome")}
            className="strtbtn_status fadeInUp"
          >
            Start Now..!
          </button>
        </div>
      </div>
      <div style={{ marginTop: "0px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default StatusHome;
