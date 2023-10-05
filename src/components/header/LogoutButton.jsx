import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { resetPost } from "../../store/postSlice";
import { RiLogoutCircleLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LogoutButton() {
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Logout...");
    authService
      .logout()
      .then(() => {
        toast.success("Logout Successful!", { id: loadingToast });
        dispatch(logout());
        dispatch(resetPost());
      })
      .catch((error) => {
        toast.error(error.message, { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <button
      className="flex items-center hover:opacity-70 disabled:opacity-30 gap-1 text-red-500 dark:text-[#ec0f0f] dark:font-semibold font-[500] text-base"
      onClick={logoutHandler}
      disabled={loading}
    >
      <RiLogoutCircleLine />
      <span className="font-inter">Logout</span>
    </button>
  );
}
