import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout()
        .then(() => {
        dispatch(logout());
        })
        .catch((error) => {
            console.log(error);
        })
  };
  return <button>Logout</button>;
}
