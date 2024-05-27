import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedPage from "../views/ProtectedPage";
import Axios from "axios";
import styled from "styled-components";
import useAxios from "../utils/useAxios"; // Assuming you have a custom hook for API requests
import useApiRequest from '../components/useApiRequest';

const PaymentContainer = styled.div`
  background-color: #fafafb;
  padding: 40px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #284055;
  text-align: center;
`;

const Amount = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const UserName = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  color: #284055;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #0fb8c9;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0a7a8b;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export function PaytmButton() {
  const [address, setAddress] = useState("");
  const [res, setRes] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const api = useAxios(); // Custom hook for API requests
  const { hitRequest } = useApiRequest();

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

  useEffect(() => {
    fetchData();
  }); // Fetch user data on component mount

  const handleSuccess = (res) => {
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    document.getElementById("paymentFrm").style.display = "none";

    let heading1 = document.createElement("h1");
    heading1.innerText = "Redirecting you to Paytm....";
    let heading2 = document.createElement("h1");
    heading2.innerText = "Please do not refresh your page....";

    let frm = document.createElement("form");
    frm.action = "https://securegw-stage.paytm.in/order/process/";
    frm.method = "post";
    frm.name = "paytmForm";

    keyArr.forEach((k, i) => {
      let inp = document.createElement("input");
      inp.type = "hidden";
      inp.name = k;
      inp.value = valArr[i];
      frm.appendChild(inp);
    });

    document.body.appendChild(heading1);
    document.body.appendChild(heading2);
    document.body.appendChild(frm);
    frm.submit();
  };

  const startPayment = async () => {
    const body = {
      userid: user.user_id,
      productid: location.state.productid,
      address: address,
      amount: location.state.amount,
    };

    try {
      const res = await Axios.post(
        'https://avinash8654340.pythonanywhere.com/paytm/pay/',
        body,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        handleSuccess(res.data.body);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookTheOrder = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const res = await hitRequest(`/order/addData/${location.state.productid}/`, { payment: false }, 'POST');
      alert(res.Message);
      navigate("/order");
    } catch (error) {
      console.error('Error adding to Order:', error);
    }
  }

  return (
    <>
      <ProtectedPage />
      <PaymentContainer id="paymentFrm">
        <Title>Product Name: {location.state.product_name}</Title>
        <Amount>Product Price: {location.state.amount}</Amount>
        <UserName>Customer Name: {res}</UserName>
        <Form>
          <Label htmlFor="address">Shipping Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="button" onClick={startPayment}>Pay Now</Button>
          <Button type="button" onClick={bookTheOrder}>Pay At Arrival</Button>
        </Form>
      </PaymentContainer>
    </>
  );
}

export default PaytmButton;