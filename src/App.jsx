import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./utils/protectedRoute";
import Profile from "./pages/profile";
import LayoutMobile from "./layouts/layoutMobile";
import { AuthContextProvider } from "./contexts/auth-context";
import DetailProfile from "./pages/detailProfile";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LayoutMobile />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detailProfile" element={<DetailProfile />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
