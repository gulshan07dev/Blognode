import { useEffect, useState } from "react" ;
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {Outlet} from "react-router-dom";
import {login, logout} from "./store/authSlice";
import {Header, Footer} from "./components"; 

function App() { 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentser()
      .then((userData) => {
        if(userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return !loading ? (
    <main>
      <Header />
      {/* <Outlet /> */}
      <Footer />
    </main>
  ) : (null)
}

export default App
