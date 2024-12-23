import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import NavBar from "../../Home/NavBar/NavBar";
import Footer from "../../Home/Footer/Footer";
function PublishPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workouts, setWorkouts] = useState({
    run: "",
    pushups: "",
    lifted: "",
    description: "",
    date: "",
    publish: "",

    udescription: "",
    udate: "",
    uname: "",
  });
  const {
    run,
    pushups,
    lifted,
    description,
    date,
    publish,
    uname,
    udate,
    udescription,
  } = workouts;

  const onInputChange = (e) => {
    setWorkouts({ ...workouts, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/workoutStatus/${id}`, workouts);
    alert("Podsted successfully");
    navigate("/posthome");
  };
  const loadUser = async (e) => {
    const result = await axios.get(`http://localhost:8080/workoutStatus/${id}`);
    setWorkouts(result.data);
  };
  return (
    <div>
      <div className="bk_color">
        <NavBar />
        <div className=" fadeInUp">
          <div>
            {/* <h1 className="topic_details">
              Update<span className="topicsub_details"> Workouts..!</span>
            </h1> */}
            <form onSubmit={(e) => onSubmit(e)} className="cardtwo">
              <div className="post_structure">
                <div className="post_structure_sub">
                  <div className="img_post_bk"></div>
                  <p className="form_lable">Date</p>
                  {date}
                  <br></br>
                  <p className="form_lable">Distance Ran </p>
                  {run}Km
                  <br></br>
                  <p className="form_lable">Number of Pushups Completed</p>
                  {pushups}
                  <br />
                  <p className="form_lable">Weight Lifted :</p>
                  {lifted}Kg
                  <br />
                  <p className="form_lable">Description:</p>
                  {description}
                </div>
              </div>
              <div className="form_full">
                <label className="form_lable">
                  Select Your Publish Status:
                </label>
                <br></br>
                <select
                  className="form_input"
                  value={publish}
                  onChange={(e) => onInputChange(e)}
                  name="publish"
                >
                  <option value="">Select type</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label className="form_lable" for="pushups">
                  Add Today Date
                </label>
                <br />
                <input
                  onChange={(e) => onInputChange(e)}
                  type="date"
                  className="form_input"
                  value={udate}
                  name="udate"
                />
                <br />
                <label className="form_lable" for="weight">
                  Enter Your Full Name
                </label>
                <br></br>
                <input
                  onChange={(e) => onInputChange(e)}
                  type="text"
                  className="form_input"
                  value={uname}
                  name="uname"
                  placeholder="Enter full name"
                />
                <br />
                <label className="form_lable" for="description">
                  Enter Post Description:
                </label>
                <br></br>
                <textarea
                  className="form_input"
                  value={udescription}
                  onChange={(e) => onInputChange(e)}
                  name="udescription"
                  placeholder="Enter a brief description about post"
                ></textarea>
                <button className="add_btnbtn">Post</button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default PublishPost;
