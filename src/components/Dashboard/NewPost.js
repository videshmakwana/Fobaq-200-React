import React, { Component } from "react";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      isShowMore: false,
    };
  }
  render() {
    const { imgSrc, tags, generatedContent } = this.props;
    const { isShowMore } = this.state;
    return (
      <div className="post-container">
        <div className="card">
          <div className="header-btn">
            <button className="card-btn">Share</button>
            <button className="card-btn">Edit</button>
          </div>
          <div className="post-image">
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
