import React from "react";
import Announcement from "../components/Announcement";
import HomeCategories from "../components/HomeCategories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import HomeProducts from "../components/HomeProducts";
import Slider from "../components/Slider";


import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "../views/ProtectedPage";
import HomeArtists from "../components/HomeArtists";
import { Link } from "react-router-dom"


const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  
  return (
    <div>
      <ProtectedPage/>
      <Announcement />
      <Navbar />
      <Slider />
      <Link to={"/category"}><span style={{ fontWeight: "bold" }}>Categories</span></Link>
      <HomeCategories />
      <Link to={"/product"}><span style={{ fontWeight: "bold" }}>Products</span></Link>
      <HomeProducts/>
      <Link to={"/artist"}><span style={{ fontWeight: "bold" }}>Artist</span></Link>
      <HomeArtists/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
