import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./utils/protectedRoute";
import Profile from "./pages/profile";
import LayoutMobile from "./layouts/layoutMobile";
import { AuthContextProvider } from "./contexts/auth-context";
import DetailProfile from "./pages/detailProfile";
import Menu from "./pages/menu";
import DetailProduct from "./pages/detailProduct";
import Checkout from "./pages/checkout";
import { Payment } from "./pages/payment";
import HistoryTransaction from "./pages/historyTransaction";
import Layout from "./layouts/layout";
import LoginAdmin from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import LayoutDesktop from "./layouts/layoutDesktop";
import Products from "./pages/admin/products";
import CreateProduct from "./pages/admin/createProduct";
import Users from "./pages/admin/users";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* ADMIN */}
          <Route path="/admin" element={<LayoutDesktop/>}>
            <Route index element={<LoginAdmin/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="products" >
              <Route index element={<Products/>}/>
              <Route path="create" element={<CreateProduct/>}/>
            </Route>
          </Route>
          {/* USER */}
          <Route path="/" element={<LayoutMobile />}>
            <Route element={<Layout/>}>
              <Route index element={<Home />} />
              <Route path="/product-list" element={<Menu />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/profile" element={<DetailProfile />} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/history-transaction" element={<HistoryTransaction/>}/>
              </Route>
            </Route>  
            <Route path="/product-list/:id" element={<DetailProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />   
            <Route element={<ProtectedRoute/>}>
              <Route path="/profile-edit" element={<Profile />} />
              <Route path="/payment/:tn" element={<Payment/>}/>
            </Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
