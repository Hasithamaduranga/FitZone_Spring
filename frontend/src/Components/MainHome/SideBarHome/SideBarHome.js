import React from "react";
import NavBarHome from "../NavBarHome/NavBarHome";
import "./sidebar.css";
import imgSide from "./img/bk.png";
import { FaDumbbell } from "react-icons/fa";
function SideBarHome() {
  return (
    <div>
      <NavBarHome />
      <div>
        <div className="sidd_bar_main">
          <div className="firstbox">
            <p
              className="sidebar_menu_one"
              onClick={() => (window.location.href = "/postdetails")}
            >
              <FaDumbbell className="icon_sidebr" /> Gallery
            </p>
            <p
              className="sidebar_menu_one"
              onClick={() => (window.location.href = "/posthome")}
            >
              <FaDumbbell className="icon_sidebr" /> Workout Status
            </p>
            <p
              className="sidebar_menu_one"
              onClick={() => (window.location.href = "/planeworkouthome")}
            >
              <FaDumbbell className="icon_sidebr" /> Workout Plan
            </p>
            <p
              className="sidebar_menu_one"
              onClick={() => (window.location.href = "/meal-home")}
            >
              <FaDumbbell className="icon_sidebr" /> Meal Plan
            </p>
          </div>
          <div></div>
          <div>
            <img src={imgSide} alt="logoside" className="logoside" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarHome;
