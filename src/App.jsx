import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ViewProduct from "./pages/ViewProduct";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Categories from "./components/Categories";
import CategoryProduct from "./components/CategoryProduct";
import SearchProduct from "./components/SearchProduct";
import Order from "./pages/Order";
import ArtistPage from "./components/ArtistPage";
import Upload from "./components/ArtistPage";
import Designs from "./components/Designs";

const App = () => {
  return (
    <>

  <BrowserRouter>
    <Routes>   
      <Route path="/" element={<Home/>} />
      <Route path="search/:id" element={<SearchProduct/>} />
      <Route path="login/" element={<Login />} />
      <Route path="cart/" element={<Cart />} />
      <Route path="order/" element={<Order />} />
      <Route path="artist/" element={<ArtistPage />} />
      <Route path="addData/" element={<Upload />} />
      <Route path="register/" element={<Register />} />
      <Route path="product/:id" element={<ViewProduct/>} />
      <Route path="product/" element={<ProductList />} />
      <Route path="category/" element={<Categories />} />
      <Route path="designs/" element={<Designs/>} />
    </Routes>
  </BrowserRouter>
  </>
  );
};

export default App;