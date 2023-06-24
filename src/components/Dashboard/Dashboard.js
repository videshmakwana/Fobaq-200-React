import React, { useState } from "react";
// import PopupModal from "../PopupModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
// import { Route, Routes } from "react-router-dom";
// import CreatePost from "./CreatePost";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("createPost");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="body-container">
      <Navbar />
      <div className="body-layout">
        <Sidebar activeTab={activeTab} handleTab={(tab) => handleTab(tab)} />
        <div className="main-container">
          {activeTab === "createPost" ? <CreatePost /> : null}
          {activeTab === "posts" ? <PostsList /> : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
