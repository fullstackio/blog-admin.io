import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { HeadingProvider } from "./context/HeadingContext";
import UserSignin from "./authentication/user/userSignin/user-signin";
import { apiUrl, processRun } from "./config/config";
import Auth from "./authentication/auth";
import Layout from "./components/layout";
import Dashboard from "./components/pages/dashboard/dashboard";
import PageNotFound from "./components/pages/pageNotFound/pageNotFound";
import UserSignup from "./authentication/user/userRegistration/user-signup";
import ForgotPassword from "./authentication/user/userForgotPassword/forgot-password";
import ResetPassword from "./authentication/user/userResetPassword/reset-password";
import "primeicons/primeicons.css";
import Post from "./components/pages/post/post";
import Posts from "./components/pages/post/posts/posts";
import PostDetails from "./components/pages/post/postDetails/postDetails";
import AddPost from "./components/pages/post/addPost/addPost";

function App() {
  console.log("Node Environment process runnung: ", processRun);
  return (
    <Router>
      <HeadingProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/user/signin" />} />
          <Route path="auth" element={<Auth />}>
            <Route path="user">
              <Route path="signin" element={<UserSignin />} />
              <Route path="signup" element={<UserSignup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="ms-admin">
              <Route path="signin" element={<UserSignin />} />
              <Route path="signup" element={<UserSignup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post" element={<Post />}>
              <Route path="all-posts" element={<Posts />} />
              <Route path="all-post/:id" element={<PostDetails />} />
              <Route path="add-post" element={<AddPost />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HeadingProvider>
    </Router>
  );
}

export default App;
