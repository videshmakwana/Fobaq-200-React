import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    const { activeTab, handleTab } = this.props;
    return (
      <div className="sidebar">
        <ul className="menu-list">
          <li
            className={`menu-item ${
              activeTab === "createPost" ? "active" : ""
            }`}
            onClick={() => handleTab("createPost")}
          >
            Create Post
          </li>
          <li
            className={`menu-item ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => handleTab("posts")}
          >
            Posts
          </li>
        </ul>
      </div>
    );
  }
}
