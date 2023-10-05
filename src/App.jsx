import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader, ScrollToTop } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
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
      <main className="min-h-screen w-full pb-7 bg-white dark:bg-[#131315]">
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
      <Toaster />
    </>
  ) : (
    <Loader />
  );
}

export default App;
