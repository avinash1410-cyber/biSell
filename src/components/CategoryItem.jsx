import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Darker background color for better contrast */
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Text = styled.span`
  color: #fff; /* White text color for better visibility */
  font-size: 24px; /* Increased font size for better readability */
  font-weight: bold; /* Bold font weight for emphasis */
  text-transform: uppercase; /* Uppercase text for style */
  letter-spacing: 2px; /* Increased letter spacing for better legibility */
`;

const CategoryItem = ({ item }) => {
  return (
    <Link to={`/category/${item.id}`}>
      <Container>
        <Image src={`https://res.cloudinary.com/dh9lxhvqt/${item.image}`} alt="Product Image" />
        <Info>
          <Text>{item.name}</Text>
        </Info>
      </Container>
    </Link>
  );
};

export default CategoryItem;