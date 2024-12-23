import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";
function AddPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    description: "",
    gmail: "",
    name: "",
    title: "",
    photos: [], // Add state for photo
    video: null, // Add state for video
  });
  const { description, gmail, title, photos, video, name } = post;

  const onInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // const handlePhotoChange = (e) => {
  //   setPost({ ...post, photos: e.target.files }); // Update to store array of files
  // };
  const handlePhotoChange = (e) => {
    // Get the selected files
    const selectedPhotos = e.target.files;
    // Check if the number of selected photos exceeds 3
    if (selectedPhotos.length > 3) {
      // If more than 3 photos are selected, alert the user and reset the input field
      alert("You can only upload up to 3 photos.");
      e.target.value = null;
      return;
    }
    // Update the state to store the selected photos
    setPost({ ...post, photos: selectedPhotos });
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    const videoElement = document.createElement("video");

    // Set up event listener to check duration once metadata is loaded
    videoElement.addEventListener("loadedmetadata", function () {
      // Check if the video duration is less than or equal to 30 seconds
      if (videoElement.duration <= 30) {
        setPost({ ...post, video: selectedVideo });
      } else {
        // If the video is longer than 30 seconds, display an alert to the user
        alert(
          "Please select a video file that is less than or equal to 30 seconds."
        );
        // Clear the input field
        e.target.value = null;
      }
    });

    // Set the src of the video element to the selected video file
    videoElement.src = URL.createObjectURL(selectedVideo);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("gmail", gmail);
      formData.append("name", name);
      formData.append("title", title);
      // Append each photo file separately
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }
      formData.append("video", video);
      await axios.post("http://localhost:8080/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post uploaded successfully");
      navigate("/postdetails");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to upload post. Please try again later.");
    }
  };

  return (
    <div className="bk_color post_box_new">
      <NavBarHome />
      <div className="form_box_meel">
        <div className="new_bkkk">
          <h1 className="topic vvv">
            Add New<span className="topicsub vvv"> Post..!</span>
          </h1>
          <form onSubmit={(e) => onSubmit(e)} className="form_full_meel">
            
            <label className="form_lable" htmlFor="description">
              gmail
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={gmail}
              required
              name="gmail"
              placeholder="Enter gmail"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              name
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={name}
              required
              name="name"
              placeholder="Enter your name"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              title
            </label>
            <br />
            <input
              onChange={(e) => onInputChange(e)}
              type="text"
              className="form_input"
              value={title}
              required
              name="title"
              placeholder="Enter post title"
            />
            <br />
            <label className="form_lable" htmlFor="photo">
              Upload Photo
            </label>
            {/* Allow multiple file selection */}
            <input
              className="form_input"
              type="file"
              onChange={handlePhotoChange}
              accept="image/*"
              multiple
            />
            <br /> 
            <label className="form_lable" htmlFor="video">
              Upload Video
            </label>
            <input
              className="form_input"
              type="file"
              onChange={handleVideoChange}
              accept="video/*"
            />
            <br />
            <label className="form_lable" htmlFor="description">
              Description
            </label>
            <br />
            <textarea
              onChange={(e) => onInputChange(e)}
              type="text"
             
              className="form_input"
              value={description}
              required
              name="description"
              placeholder="Enter description"
            />
            <br /> <br />
            <button className="add_btnbtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
