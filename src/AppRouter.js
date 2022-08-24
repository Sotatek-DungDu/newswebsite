import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/user/Login";
import Home from "./components/main/Home";
import Register from "./components/user/Register";
import Contact from "./components/main/Contact/Contact";
import ResetPassword from "./components/user/ResetPassword";
import Layout from "./components/admin/layout/Layout";
import Advertisement from "./components/admin/advertisement/Advertisement";
import Comment from "./components/admin/comment/Comment";
import Admin from "./components/admin/dashboard/Admin";
import Feedback from "./components/admin/feedback/Feedback";
import PostsManagement from "./components/admin/posts/PostsManagement";
import Statistics from "./components/admin/statistics/Statistics";
import UserManagement from "./components/admin/usermanagement/UserManagement";
import LayoutPage from "./components/main/LayoutPage";
import BlogGridContainer from "./components/main/BlogGrid/BlogGridContainer";
import BlogDetailContainer from "./components/main/BlogDetailNoSideBar/BlogDetailContainer";
import Profile from "./components/user/Profile";
import PrivateRouter from "./components/user/PrivateRoute";
import FeedbackItem from "./components/admin/feedback/FeedbackItem";
import CommentItem from "./components/admin/comment/CommentItem";
import Notification from "components/admin/notification/Notification";
import ListResultSearch from "components/admin/dashboard/ResultSearch";
import DetailPosts from "../src/components/admin/posts/DetailPost";
import BlogDetail from "./components/main/Blog/BlogDetail/BlogDetail"
import AboutUs from "components/main/AboutUs/AboutUs";
import BlogList from "components/main/BlogList/BlogList";
import Category from "components/main/Category/Category";
import BlogDetailContent from "components/main/BlogDetailNoSideBar/Blogdetailcontent/BlogDetailContent";
// import DetailPosts from "components/admin/posts/DetailPost";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPage />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/blogdetail/:id" element={<BlogDetail />} />
            <Route path="/blogdetailcontent/:id" element={<BlogDetailContent />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/bloglist/:id" element={<BlogList />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/bloggrid" element={<BlogGridContainer />} />
            <Route path="/blogdetailnosidebar" element={<BlogDetailContainer />} />
            <Route path="/bloggrid" element={<BlogGridContainer />} />
            <Route path="/blogdetailnosidebar" element={<BlogDetailContainer />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="/admin" element={<PrivateRouter><Layout /></PrivateRouter>}>
            <Route index element={<Admin />} />
            <Route path="advertisement" element={<Advertisement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="posts" element={<PostsManagement />} />
            <Route path="posts/:id" element={<DetailPosts />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="feedbacks" element={<Feedback />} />
            <Route path="feedbacks/:id" element={<FeedbackItem />} />
            <Route path="comments" element={<Comment />} />
            <Route path="comments/:id" element={<CommentItem />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="search" element={<ListResultSearch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;