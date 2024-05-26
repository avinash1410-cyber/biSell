import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";

import { Typography, Box, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import MovingText from "../components/MovingText";




const Container = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled(Typography)`
  margin-left: 16px;
  font-size: 18px;
  color: #333;
`;


function ProtectedPage() {
  const [res, setRes] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("account/test/");
        setRes(response.data.response);
      } catch {
        alert("Must Log in First");
        setRes("Anonymous User");
        navigate("/login");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Container>
      <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon style={{ fontSize: 48, color: '#3f51b5' }} />
      </IconButton>
      <Text>{res || "No data available"}</Text>
      <MovingText />
    </Container>
  );
}

export default ProtectedPage;