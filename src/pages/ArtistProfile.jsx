import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DesignItem from "../components/DesignItem"; // Import the DesignItem component

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 70vh;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #f8f4f4;
    color: teal;
  }
`;

const DemosHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
`;




const DesignsContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

function ViewProduct() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // Fetch artist profile
    axios
      .get(`https://avinash8654340.pythonanywhere.com/artist/${id}`)
      .then((res) => {
        setArtist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch designs by artist
    axios
      .get(`https://avinash8654340.pythonanywhere.com/design/?artist=${id}`)
      .then((res) => {
        setDesigns(res.data);
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
        <ImgContainer>
          <Link to={`/artist/${id}/designs`}>
            <Image
              src={`https://res.cloudinary.com/dh9lxhvqt/${artist === null ? "loading" : artist.image}`}
              alt="Artist Image"
            />
          </Link>
        </ImgContainer>
        <InfoContainer>
          <Title>Name: {artist === null ? "loading" : artist.cust.user.username}</Title>
          <Title>Contact No: {artist === null ? "loading" : artist.cust.phone}</Title>
          <Title>Current City: {artist === null ? "loading" : artist.cust.add}</Title>
          <Title>Buiseness Email Id: {artist === null ? "loading" : artist.cust.email}</Title>
          <ButtonContainer>
            <Link to="/contact">
              <Button>CONTACT</Button>
            </Link>
            <Link to={`/artist/${id}/designs`}>
              <Button>My Designs</Button>
            </Link>
            <Link to="/design/upload">
              <Button>Add Design</Button>
            </Link>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>
      {/* Display designs */}
      <DemosHeading>Here are some demos</DemosHeading>
      <DesignsContainer>
        {/* Use slice to limit the number of designs to 3 */}
        {designs.slice(0, 3).map((design) => (
          <DesignItem key={design.id} item={design} name={design.design} />
        ))}
      </DesignsContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ViewProduct;