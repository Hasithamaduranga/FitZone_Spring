import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { useParams } from "react-router";
import "../workout.css";
import { useReactToPrint } from "react-to-print";
import { FaFilePdf } from "react-icons/fa6";
import push from "./img/push.png";
import { FaCameraRetro } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdOutlineEventNote } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { FaRegShareSquare } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaRunning } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import NavBar from "../../Home/NavBar/NavBar";
import { TiThMenu } from "react-icons/ti";
import Footer from "../../Home/Footer/Footer";
function WorkoutDetails() {
  const [workouts, setWorkouts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:8080/workoutStatus");
    setWorkouts(result.data);
  };

  // Delete workout function
  const deleteWorkouts = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:8080/workoutStatus/${id}`);
        // Reload workouts after successful deletion
        loadWorkouts();
        // Display success message
        alert("Workout deleted successfully!");
      } catch (error) {
        // Handle any errors
        console.error("Error deleting workout:", error);
        // Display error message
        alert("An error occurred while deleting the workout.");
      }
    }
  };
  const monthlyTotals = {};
  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);
    const month = workoutDate.toLocaleString("default", { month: "long" });
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = {
        totalRun: 0,
        totalPushups: 0,
        totalLifted: 0,
      };
    }
    monthlyTotals[month].totalRun += parseFloat(workout.run);
    monthlyTotals[month].totalPushups += parseFloat(workout.pushups);
    monthlyTotals[month].totalLifted += parseFloat(workout.lifted);
  });
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Details Report",
    onafterprint: () => alert("Details Report Successfully Downloaded!"),
    bodyClass: "bk_color", 
  });

  const handleClick2 = () => {
    const element = document.getElementById("capture"); // ID of the element to capture
    const backgroundColor = "black"; // Set background color to black
    html2canvas(element, { backgroundColor, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "workout_details.png";
      link.href = imgData;
      link.click();
    });
  };
  

  return (
    <div className="bk_color">
      <NavBar />
      <div>
        <div
          className="addbtnbtnworkout fadeInUp"
          onClick={() => (window.location.href = "/addworkout")}
        >
          <IoIosAdd className="adicon" />
        </div>
        <div onClick={handleClick2} className="imgdwonlod fadeInUp">
          <FaCameraRetro className="adicon_pdf" />
        </div>
        <div onClick={handlePrint} className="pdfdwonlod fadeInUp">
          <FaFilePdf className="adicon_pdf" />
        </div>
      </div>
      <div ref={ComponentsRef}  className='zdex'id="capture">
        <h1 className="topic_details fadeInUp">
          Your Workout<span className="topicsub_details"> Analize..!</span>
        </h1>

        <div className="monthtbl">
          {Object.keys(monthlyTotals).map((month, index) => (
            <div key={index} className="montcrd fadeInUp">
              <h2 className="mont">{month}</h2>
              <div>
                <h3 className="card_iconfit">
                  <FaRunning /> Total Run:{" "}
                  <span className="tot">
                    {monthlyTotals[month].totalRun} km
                  </span>
                </h3>
                <h3 className="card_iconfit">
                  <img src={push} alt="pushimg" className="icontbl" />
                  Total Pushups:{" "}
                  <span className="tot">
                    {monthlyTotals[month].totalPushups}
                  </span>
                </h3>
                <h3 className="card_iconfit">
                  <GiWeight />
                  Total Lifted:{" "}
                  <span className="tot">
                    {monthlyTotals[month].totalLifted} kg
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
        <h1 className="topic_details fadeInUp">
          Your Workout<span className="topicsub_details"> Details..!</span>
        </h1>
        <div>
          <div className="table_main fadeInUp">
            <table className="table_details_admin">
              <thead>
                <tr>
                  <th className="admin_tbl_th">
                    <FaDumbbell />
                  </th>
                  <th className="admin_tbl_th ">
                    <p className="iconfit">
                      <FaRunning /> Run
                    </p>
                  </th>
                  <th className="admin_tbl_th">
                    <p className="iconfit">
                      <img src={push} alt="pushimg" className="icontbl" />
                      Pushups
                    </p>
                  </th>
                  <th className="admin_tbl_th">
                    <p className="iconfit">
                      <GiWeight />
                      Lifted
                    </p>
                  </th>
                  <th className="admin_tbl_th">
                    <p className="iconfit">
                      <FaCalendarAlt />
                      Date
                    </p>
                  </th>
                  <th className="admin_tbl_th">
                    <p className="iconfit">
                      <MdOutlineEventNote />
                      Note
                    </p>
                  </th>
                  <th className="admin_tbl_th">
                    <p className="iconfit">
                      <TiThMenu />
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={index}>
                    <td className="admin_tbl_td">{index + 1}</td>
                    <td className="admin_tbl_td">{workout.run} km</td>
                    <td className="admin_tbl_td">{workout.pushups}</td>
                    <td className="admin_tbl_td">{workout.lifted} kg</td>
                    <td className="admin_tbl_td">{workout.date}</td>
                    <td className="admin_tbl_td">{workout.description}</td>
                    <td className="admin_tbl_td">
                      <Link
                        to={`/updateworkout/${workout.id}`}
                        className="btnbtnnew"
                      >
                        <GrUpdate />
                      </Link>
                      <button
                        onClick={() => deleteWorkouts(workout.id)}
                        className="btnbtndltnew"
                      >
                        <FaTrash />
                      </button>
                      <Link
                       
                        to={`/publishwork/${workout.id}`}
                        className="btnbtn_update"
                      >
                        <FaRegShareSquare />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default WorkoutDetails;
