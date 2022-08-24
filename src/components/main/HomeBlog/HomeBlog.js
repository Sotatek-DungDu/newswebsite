import React from "react";
import Address from "../Address";
import Footer from "../Footer";
import Header from "../Header/Header";
import FeaturePost from "./FeaturePost";
import Post from "./Post";

function HomeBlog() {
  return (
    <div className="animsition">
      {/* <Address /> */}
      <FeaturePost />
      <Post />
    </div>
  );
}

export default HomeBlog;
