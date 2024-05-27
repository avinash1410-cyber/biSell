import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import ArtistItem from "./ArtistItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  flex-wrap: wrap; /* Ensures items wrap to the next line if needed */
  background-color: #f5f5f5; /* Light background for better contrast */
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Title = styled.h1`
  margin: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #333; /* Darker color for the title */
  text-align: center; /* Center the title */
`;

const Artists = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://avinash8654340.pythonanywhere.com/artist/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Title>Artists</Title>
      <Container>
        {categories.map((item) => (
          <ArtistItem item={item} key={item.id} />
        ))}
      </Container>
    </div>
  );
};

export default Artists;