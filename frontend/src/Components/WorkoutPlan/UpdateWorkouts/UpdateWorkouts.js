import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";

function UpdateWorkouts() {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/workoutplan/${id}`, workoutplan);
    alert("Workout Plane Update successfully");
    navigate("/planeworkouthome");
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8080/workoutplan/${id}`);
    setWorkouts(result.data);
  };
  return (
    <div className="bk_color post_box_new">
           <NavBarHome />
      <div className="form_box_meel">
        <div className="new_bkkk">
          <h1 className="topic vvv">
            Update<span className="topicsub vvv"> Workout Plane..!</span>
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
            <button className="add_btnbtn">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateWorkouts;
