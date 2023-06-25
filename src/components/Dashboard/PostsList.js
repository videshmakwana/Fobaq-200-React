import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPost from "./EditPost";
const apiUrl = process.env.REACT_APP_BASE_URL;
const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
};
const data = {
  userId: localStorage.getItem("userId"),
};
function PostsList() {
  const [postDetails, setPostDetails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const getPostList = async () => {
    const config = { headers };
    try {
      const response = await axios.post(
        `${apiUrl}rest/accounts/posts/all`,
        {
          userId: localStorage.getItem("userId"),
        },
        config
      );
      console.log(response.data);
      setPostDetails(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostList();
  }, []);

  const handlePostEdit = () => {
    setIsEdit(true);
  };
  return (
    <div className="allpost">
      {postDetails.map((post) => (
        <EditPost
          imgSrc={post.imageURL}
          tags={post.tags.split(" ")}
          generatedContent={post.postContent}
          post={post}
          handlePostEdit={handlePostEdit}
          getPostList={getPostList}
        />
      ))}
    </div>
  );
}
export default PostsList;
