import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import ArtistItem from "./ArtistItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;


const HomeArtists = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://avinash8654340.pythonanywhere.com/artist/")
      .then((res) => {
        console.log(res);
        const firstThreeProducts = res.data.slice(0, 3);
        setCategories(firstThreeProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Container>
        {categories.map((item) => (
          <ArtistItem item={item} key={item.id} />
        ))}
      </Container>
      <br />
    </div>
  );
};

export default HomeArtists;