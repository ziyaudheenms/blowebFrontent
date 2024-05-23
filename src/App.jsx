import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Create from "./Components/Create";
import Users from "./Components/Users";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProfileBuilder from "./Components/ProfileBuilder";
import SinglePage from "./Components/SinglePage";
import ClickProfile from "./Components/ClickProfile";
import EditPost from "./Components/EditPost";
import NewComponent from "./Components/NewComponent";
import ImageUploadForm from "./Components/ImageUploadForm";
import EditProfile from "./Components/EditProfile";
import Foot from "./Components/Foot";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/Users" element={<Users />}/>
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/buildprofile" element={<ProfileBuilder />}/>
          <Route path="/SinglePage" element={<SinglePage />}/>
          <Route path="/Create" element={<Create />}/>
          <Route path="/ClickProfile" element={<ClickProfile />}/>
          <Route path="/EditBlog" element={<EditPost />}/>
          <Route path="/EditProfile" element={<EditProfile />}/>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
