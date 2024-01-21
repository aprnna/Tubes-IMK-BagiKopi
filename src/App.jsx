import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./utils/protectedRoute";
import Profile from "./pages/profile";
import LayoutMobile from "./layouts/layoutMobile";
import { AuthContextProvider } from "./contexts/auth-context";
import Menu from "./pages/menu";
import DetailProduct from "./pages/detailProduct";
import Checkout from "./pages/checkout";
import { Payment } from "./pages/payment";
import HistoryTransaction from "./pages/historyTransaction";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LayoutMobile/>}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-list" element={<Menu />} />
            <Route path="/product-list/:id" element={<DetailProduct />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/checkout" element={<Checkout/>} />
              <Route path="/payment/:tn" element={<Payment/>}/>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/history-transaction" element={<HistoryTransaction/>}/>
            </Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
