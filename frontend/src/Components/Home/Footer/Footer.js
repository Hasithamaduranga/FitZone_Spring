import React from "react";
import "./footer.css";
function Footer() {
  return (
    <div>
      <div className="fotcon">
        <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
        <div>
          <p>
            Powered by <span className="subtopic"><i>FITZONE</i></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
