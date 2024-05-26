import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 50vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;

  &:hover{
      background-color: #f8f4f4;
  }
`;

function ViewProduct(){
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios.get(`https://avinash8654340.pythonanywhere.com/artist/${id}`)
      .then((res) => {
        setArtist(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Link to={`/artist/${id}/designs`}>
          <ImgContainer>
            <Image src={`https://res.cloudinary.com/dh9lxhvqt/${artist === null ? 'loading' : artist.image}`} alt="Artist Image"/>
          </ImgContainer>
        </Link>
        <InfoContainer>
          <Title>Name   :{artist === null ? 'loading' : artist.cust.user.username}</Title>
          <Title>Contact No   :{artist === null ? 'loading' : artist.cust.phone}</Title>
          <Title>Current City    :{artist === null ? 'loading' : artist.cust.add}</Title>
          <Title>Buiseness Email Id    :{artist === null ? 'loading' : artist.cust.email}</Title>
          <Desc>
            <Link to="/contact">
              <Button>CONTACT</Button>
            </Link>
            <Link to={`/artist/${id}/designs`}>
              <Button>My Designs</Button>
            </Link>
            <Link to="/design/upload">
              <Button>Add Design</Button>
            </Link>
          </Desc>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ViewProduct;