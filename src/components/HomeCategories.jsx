import{React,useState,useEffect} from "react"
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const HomeCategories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axios.get("https://avinash8654340.pythonanywhere.com/category/available/")
    .then((res)=>{
        console.log(res);
        const firstThreeProducts = res.data.slice(0, 3);
      setCategories(firstThreeProducts);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);



  
  return (
    <div>
    <Container>      
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    <br></br>
    </div>
  );
};

export default HomeCategories;
