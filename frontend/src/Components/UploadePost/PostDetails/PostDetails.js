import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCreate } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import NavBarHome from "../../MainHome/SideBarHome/SideBarHome";
function PostDetails() {
  const [likeCounts, setLikeCounts] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);
  const loadPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/post");
      const initialLikeCounts = response.data.reduce((acc, post) => {
        acc[post.id] = 0; // Initialize like count for each post
        return acc;
      }, {});
      setLikeCounts(initialLikeCounts);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Update handleLikeClick to handle initial like count as well
  const handleLikeClick = (postId) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + 1, // Initialize to 0 if undefined
    }));
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/post/${id}`);
        loadPosts();
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post.");
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
                onClick={() => (window.location.href = "/post")}
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
              {posts.map((post) => (
                <div className="postmaib_b" key={post.id}>
                  <div className="postbody">
                    <div className="title">{post.title}</div>
                    <div className="name">{post.name}</div>
                    <div className="name">{post.gmail}</div>
                    <div className="detais">{post.description}</div>
                    {/* Render multiple images */}
                    {post.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8080/uploads/${photo}`}
                        alt={`Photon ${index + 1}`}
                        className="imf_postt"
                        onError={(e) =>
                          console.error("Error loading image:", e)
                        }
                      />
                    ))}
                  </div>
                  <br />
                  <div className="postbody">
                    <video className="imf_postt" controls>
                      <source
                        src={`http://localhost:8080/uploads/${post.video}`}
                        type="video/mp4"
                        onError={(e) =>
                          console.error("Error loading video:", e)
                        }
                      />
                      Your browser does not support the video tag.
                    </video>
                    <hr />
                    <div className="dltbtlik">
                      <div className="likebtnset">
                        <BiLike
                          className="hand_icon"
                          onClick={() => handleLikeClick(post.id)}
                        />
                        <span>{likeCounts[post.id]}</span>
                      </div>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="btnbtndlt"
                      >
                        {" "}
                        <MdDelete />
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

export default PostDetails;
