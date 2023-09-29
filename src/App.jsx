import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <Header />
      <main className="min-h-screen">
        {/* TODO: <Outlet /> */}
      </main>
      <Footer /> 
    </>
  ) :  (<Loader />);
}

export default App;
