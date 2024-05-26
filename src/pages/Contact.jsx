import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Contact = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [add, setAddress] = useState();
  const nav = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Title>Send Your Message</Title>
        <Form>
          <Input type="text" onChange={e => setAddress(e.target.value)} placeholder="Your Message" />
          <Input type="text" onChange={e => setUserName(e.target.value)} placeholder="Your Name" />
          <Input type="email" onChange={e => setEmail(e.target.value)} placeholder="Designer Email Id" />
          <Input type="password" onChange={e => setPassword(e.target.value)} placeholder="Your Email Id" />
          <Input type="text" onChange={e => setPhone(e.target.value)} placeholder="Your Contact No" />
          <p>Your Message will be send to designer in short period of time</p>
          <br />
          <Link to="/"><h1>Submit</h1></Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Contact;