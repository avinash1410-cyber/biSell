import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import Product from './Product';
import styled from "styled-components";
import Navbar from './Navbar';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function SearchProduct() {
  const { id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState(location.state?.searchResults || []);

  useEffect(() => {
    if (!location.state?.searchResults) {
      // If there are no search results passed, fetch the data using the id from params
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`https://avinash8654340.pythonanywhere.com/products/${id}`);
          setProducts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };

      fetchProducts();
    }
  }, [id, location.state]);

  return (
    <div>
      <Navbar/>
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </div>
  );
}