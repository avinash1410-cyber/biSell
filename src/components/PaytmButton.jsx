import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import ProtectedPage from "../views/ProtectedPage";
import Axios from "axios";
import styled from "styled-components";

const Payment = styled.div`
  bodyBackgroundColor: "#fafafb";
  themeBackgroundColor: "#0FB8C9";
  themeColor: "#ffffff";
  headerBackgroundColor: "#284055";
  headerColor: "#ffffff";
`;

export function PaytmButton() {
  const [address, setAddress] = useState("");
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const handleSuccess = (res) => {
    // separate key and values from the res object which is nothing but param_dict
    let keyArr = Object.keys(res);
    let valArr = Object.values(res);

    // hide the payment form
    document.getElementById("paymentFrm").style.display = "none";

    // create form elements for redirecting to Paytm
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
      inp.key = i;
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

  return (
    <div id="paymentFrm" className="container" style={{ marginTop: "20vh" }}>
      <Payment>
        <h1>{location.state.product_name}</h1>
        <h1>{location.state.amount}</h1>
        For <ProtectedPage />
        <form>
          <label htmlFor="address">Address</label>
          <br />
          <input
            type="text"
            id="address"
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </form>
        <button onClick={startPayment}>Pay Now</button>
      </Payment>
    </div>
  );
}

export default PaytmButton;