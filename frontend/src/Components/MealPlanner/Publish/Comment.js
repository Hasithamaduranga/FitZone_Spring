import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import axios from "axios";

const Comment = ({ postId, setComments }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/comments/${postId}`, {
        comment: comment,
      });
      // Refresh comments from the server after successful submission
      const updatedComments = await axios.get(`http://localhost:8080/meelplan/${postId}`);
      setComments(updatedComments.data.comments);
      setComment(""); // Clear the comment input field
      alert("Comment added successfully"); // Move alert outside axios.post
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div>
     
      <Box display="flex" alignItems="center" gap={2} marginTop={2}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!comment.trim()} // Disable button if comment is empty or whitespace
        >
          Comment
        </Button>
      </Box>
    </div>
  );
};

export default Comment;
