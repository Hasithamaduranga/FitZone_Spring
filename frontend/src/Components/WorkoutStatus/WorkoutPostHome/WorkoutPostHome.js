import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "../workout.css";
import { IoCreate } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";
function WorkoutPostHome() {
  const [workouts, setWorkouts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();

  useEffect(() => {
    loadWorkouts();
  }, []);

  // const loadWorkouts = async () => {
  //   const result = await axios.get("http://localhost:8080/workoutStatus");
  //   setWorkouts(result.data.filter((workout) => workout.publish === "yes")); // Filter workouts where publish is "yes"
  // };

  const loadWorkouts = async () => {
    const result = await axios.get("http://localhost:8080/workoutStatus");
    const filteredWorkouts = result.data.filter(
      (workout) => workout.publish === "yes"
    );
    const initialLikeCounts = filteredWorkouts.reduce((acc, workout) => {
      acc[workout.id] = 0;
      return acc;
    }, {});
    setWorkouts(filteredWorkouts);
    setLikeCounts(initialLikeCounts);
  };

  const handleLikeClick = (workoutId) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [workoutId]: prevCounts[workoutId] + 1,
    }));
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bk_color">
      <NavBarHome onSearch={handleSearch} />
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
                onClick={() => (window.location.href = "/workoutdetails")}
              >
                <FaPenToSquare />
                Upload Post
              </button>
            </div>
          </div>
        </div>
        <div className="postmain_box">
          {workouts.map((workout, index) => (
            <div>
              <div className="postmaib_b">
                <div className="mn_flx">
                  <div className="itm_setbox">
                    <div>
                      <FaUserCircle className="user_icon" />
                    </div>
                    <div>
                      <h4 className="name_user"> {workout.uname}</h4>
                      <p className="dte"> {workout.udate}</p>
                    </div>
                  </div>
                  <CiMenuKebab className="menu_icon" />
                </div>
                <p className="pr"> {workout.udescription}</p>
                <div className="post_structure_sub_new">
                  <div className="post_structure_sub">
                    <div className="img_post_bk"></div>
                    <p className="form_lable">Date</p>
                    {workout.date}
                    <br></br>
                    <p className="form_lable">Distance Ran </p>
                    {workout.run}Km
                    <br></br>
                    <p className="form_lable">Number of Pushups Completed</p>
                    {workout.pushups}
                    <br />
                    <p className="form_lable">Weight Lifted :</p>
                    {workout.lifted}Kg
                    <br />
                    <p className="form_lable">Description:</p>
                    {workout.description}
                  </div>
                </div>
                <hr />
                <div className="likebtnset">
                  <BiLike
                    className="hand_icon"
                    onClick={() => handleLikeClick(workout.id)}
                  />
                  <span>{likeCounts[workout.id]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkoutPostHome;
