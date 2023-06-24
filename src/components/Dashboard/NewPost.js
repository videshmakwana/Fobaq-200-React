import axios from "axios";
import React, { Component } from "react";

const apiUrl = process.env.REACT_APP_BASE_URL;
const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
};

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      isShowMore: false,
    };
  }

  handleSavePost = async () => {
    const { imgSrc, tags, generatedContent, handleSteps } = this.props;
    const config = { headers };
    try {
      const response = await axios.put(
        `${apiUrl}rest/accounts/posts`,
        {
          tags: tags.join(" "),
          postContent: generatedContent,
          height: 424,
          width: 424,
          userId: localStorage.getItem("userId"),
          schedulerTime: "",
          imageURL: imgSrc,
          facebook: false,
          instagram: false,
          linkedIn: true,
        },
        config
      );
      console.log(response.data);
      if (response?.data?.type === "Success") {
        handleSteps(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { imgSrc, tags, generatedContent, handlePostEdit } = this.props;
    const { isShowMore } = this.state;
    return (
      <div className="post-container">
        <div className="card">
          <div className="header-btn">
            <button className="card-btn" onClick={handlePostEdit}>
              Edit
            </button>
            <button
              onClick={this.handleSavePost}
              className="card-btn save-post-btn"
            >
              Save post
            </button>
          </div>
          <div className="post-image" onClick={handlePostEdit}>
            <img src={imgSrc} alt="post_image" />
          </div>
          <div className={`post-content ${isShowMore ? "more" : ""}`}>
            <div className="content">{generatedContent}</div>
            {isShowMore ? (
              <div className="tags">
                {tags.map((tag) => (
                  <span className="post-hashtag">{`#${tag}`}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="more-btn">
            <button onClick={() => this.setState({ isShowMore: !isShowMore })}>
              {isShowMore ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
