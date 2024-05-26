import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from 'react';
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
  const [address, setAddress] = useState();

  return (
    <Container>
      <Wrapper>
        <Title>Send Your Message</Title>
        <Form>
          <Input type="text" onChange={e => setAddress(e.target.value)} placeholder="Your Message" />
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Designer Email Id" />
          <Input type="password" placeholder="Your Email Id" />
          <Input type="text" placeholder="Your Contact No" />
          <p>Your Message will be sent to the designer in a short period of time.</p>
          <br />
          <Link to="/"><h1>Submit</h1></Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Contact;