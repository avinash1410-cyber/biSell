import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useState, useEffect } from "react";

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

const Detail = styled.p`
  font-size: 18px;
  margin: 5px 0;
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

function DesignProduct() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);

  useEffect(() => {
    axios
      .get(`https://avinash8654340.pythonanywhere.com/design/${id}`)
      .then((res) => {
        setDesign(res.data);
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
          <Link to={`/artist/${design?.artist}/designs`}>
            <Image
              src={`https://res.cloudinary.com/dh9lxhvqt/${design ? design.image : ""}`}
              alt="Design Image"
            />
          </Link>
        </ImgContainer>
        <InfoContainer>
          <Title>Design: {design ? design.design : "loading"}</Title>
          <Detail>ID: {design ? design.id : "loading"}</Detail>
          <Detail>Artist ID: {design ? design.artist : "loading"}</Detail>
          <ButtonContainer>
            <Link to="/contact">
              <Button>CONTACT OWNER</Button>
            </Link>
            <Link to={`/artist/${design?.artist}/designs`}>
              <Button>Linked Products</Button>
            </Link>
            <Link to="/design/upload">
              <Button>Add Design</Button>
            </Link>
          </ButtonContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default DesignProduct;