import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";

function AddWorkouts() {
  const navigate = useNavigate();
  const [workoutplan, setWorkouts] = useState({
    routines: "",
    exercises: "",
    sets: "",
    repetitions: "",
    date: "",
  });

  const { routines, exercises, sets, repetitions, date } = workoutplan;

  const onInputChange = (e) => {
    setWorkouts({ ...workoutplan, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/workoutplan", workoutplan);
    alert("Workout Plan uploaded successfully");
    navigate("/planeworkouthome");
  };
  return (
    <div className="bk_color post_box_new">
      <NavBarHome />
      <div className="form_box_meel">
        <div className="new_bkkk">
          <h1 className="topic vvv">
            Add New<span className=" vvv"> Post..!</span>
          </h1>
          <form onSubmit={(e) => onSubmit(e)} className="form_full">
            <label className="form_lable" for="distance">
              Date:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="date"
              className="form_input"
              value={date}
              required
              name="date"
            />
            <br></br>
            <label className="form_lable" for="routines">
              Routines:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={routines}
              required
              name="routines"
            />
            <br></br>
            <label className="form_lable" for="pushups">
              Exercises:
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={exercises}
              name="exercises"
              required
            />
            <br />
            <label className="form_lable" for="weight">
              Sets:
            </label>
            <br></br>
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={sets}
              name="sets"
              required
            />
            <br />
            <label className="form_lable" for="Repetitions">
              Repetitions:
            </label>
            <br></br>
            <input
              className="form_input"
              value={repetitions}
              onChange={(e) => onInputChange(e)}
              name="repetitions"
              required
            ></input>
            <button className="add_btnbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWorkouts;
