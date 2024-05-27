import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Announcement from './Announcement';
import DesignItem from './DesignItem';




const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333; /* Darker color for the title */
    text-align: center; /* Center the title */
`;

const Designs = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(() => {
    axios
      .get('https://avinash8654340.pythonanywhere.com/design/')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log(res.data); // Use res.data instead of products
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts in the dependency array

  return (
    <div>
      <StyledNavbar />
      <StyledAnnouncement />
      <Title>Designs By Our Artist</Title>
      <Container>
        {products.map((item) => (
          <DesignItem item={item} key={item.id} name={item.design} />
        ))}
      </Container>
      <Link to="/product">see more</Link>
    </div>
  );
};

const StyledNavbar = styled(Navbar)`
  background-color: #f5f5f5;
`;

const StyledAnnouncement = styled(Announcement)`
  background-color: #f5f5f5;
`;

export default Designs;
