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
import ArtistProfile from "./pages/ArtistProfile";
import ArtistsPage from "./components/ArtistsPage";
import ArtistDesigns from "./components/ArtistDesigns";
import Designs from "./components/Designs";
import { AuthProvider } from "./context/AuthContext";
import ProtectedPage from "./views/ProtectedPage";
import { PaytmButton } from "./components/PaytmButton";
import Contact from "./pages/Contact";
import Upload from "./pages/Upload";
import AnotherPage from "./pages/AnotherPage";
import DesignProduct from "./components/DesignProduct";






const App = () => {
  return (
    <>
  <BrowserRouter>
  <AuthProvider>
    <Routes> 
      <Route path="/protected" element={<ProtectedPage/>}/>   
      <Route path="/" element={<Home/>} />
      <Route path="search/" element={<SearchProduct/>} />
      <Route path="login/" element={<Login />} />
      <Route path="cart/" element={<Cart />} />
      <Route path="order/" element={<Order />} />

      <Route path="artist/" element={<ArtistsPage />} />
      <Route path="artist/:id" element={<ArtistProfile />} />
      <Route path="register/" element={<Register />} />
      <Route path="product/:id" element={<ViewProduct/>} />
      <Route path="product/" element={<ProductList />} />
      <Route path="category/" element={<Categories />} />

      <Route path="category/:id" element={<CategoryProduct />} />
      <Route path="artist/:id/designs" element={<ArtistDesigns />} />


      <Route path="designs/" element={<Designs/>} />
      <Route path="design/:id" element={<DesignProduct/>} />
      <Route path="pay/:id" element={<PaytmButton/>} />

      
      <Route path="contact/" element={<Contact/>} />
      <Route path="/design/upload/" element={<Upload/>} />

      <Route path="another/" element={<AnotherPage/>} />
      <Route path="protected/" element={<ProtectedPage/>} />

    </Routes>

    </AuthProvider>
  </BrowserRouter>
  </>
  );
};

export default App;