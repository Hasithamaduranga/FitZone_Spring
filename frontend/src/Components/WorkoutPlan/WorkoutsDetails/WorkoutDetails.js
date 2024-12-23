import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";
import { Link } from "react-router-dom";
function WorkoutDetails() {
  const [workoutsplan, setWorkouts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:8080/workoutplan");
    setWorkouts(result.data);
  };

  // Delete workout function
  const deleteWorkouts = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workoutPlan?"
    );
    if (confirmDelete) {
      try {
        // Send DELETE request to delete workout
        await axios.delete(`http://localhost:8080/workoutplan/${id}`);
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

  return (
    <div className="bk_color">
      <NavBarHome />
      <div className="posthome_details fadeInUp">
        <div>
          <div className="cret_post">
            <div>
              <p className="topic_p">Create New Post</p>
            </div>
            <div className="mind">
              <p>What's on your mind.?</p>
            </div>
            <div className="iconset">
              <div className="icon_set_btn">
                <IoCreate className="icon_btn_postcrt" />
                <IoMdPhotos className="icon_btn_postcrt" />
                <FaVideo className="icon_btn_postcrt" />
                <FaPenToSquare className="icon_btn_postcrt" />
              </div>
              <button
                className="btn_cret"
                onClick={() => (window.location.href = "/addworkoutplN")}
              >
                <FaPenToSquare />
                Upload Post
              </button>
            </div>
          </div>
        </div>
        <div className="table_main">
          <div>
            <div className="postmain_box">
              {workoutsplan.map((workout, index) => (
                <div className="postmaib_b" key={index}>
                  <div className="postbody VVK">
                    <h3 className="topic_enw">My Workourt Plan {index + 1}</h3>
                    <div className="detilpot" ><b>Routines : </b>{workout.routines}</div>
                    <div className="detilpot"><b>Exercises : </b>{workout.exercises}</div>
                    <div className="detilpot"><b>Sets : </b>{workout.sets}</div>
                    <div className="detilpot"><b>Date : </b>{workout.date}</div>
                    <div className="detilpot"><b>Repetitions : </b>{workout.repetitions}</div>
                    <div className="brncom">
                      <Link
                        to={`/updateworkoutplan/${workout.id}`}
                        className="btnbtn"
                      >
                        <GrUpdate />Update
                      </Link>
                      <button
                        onClick={() => deleteWorkouts(workout.id)}
                        className="btnbtndlt"
                      >
                        <MdDelete /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
