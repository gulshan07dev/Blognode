import { Container, Logo, LogoutButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaListUl, FaPlus } from "react-icons/fa";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: FaHome,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
      icon: FaListUl,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: FaPlus,
    },
  ];

  return (
    <header className="py-3.5 shadow-sm border-b-[1px] border-b-gray-100 bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex justify-between items-center">
          <Logo className="max-md:text-base text-3xl" />

          <div
            className={`
              ${
                authStatus
                  ? "max-md:fixed max-md:bottom-0 max-md:w-screen max-md:flex max-md:justify-center max-md:p-3"
                  : ""
              } bg-none
            `}
          >
            <ul
              className={`flex h-fit gap-0 overflow-hidden shadow-sm border-[1px] border-gray-300 rounded-full ${
                authStatus
                  ? "max-md:bg-[#ffffffbb] max-md:backdrop-blur-sm"
                  : ""
              } bg-white`}
            >
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <Link to={`${item.slug}`}>
                      <button
                        className={`flex items-center gap-2 md:px-5 ${
                          authStatus ? "px-6" : "px-3"
                        } md:py-2 py-2 text-center font-nunito-sans md:text-lg font-[500] duration-200 hover:bg-gray-50 hover:shadow-sm border-x-[1px] border-gray-200`}
                      >
                        {item.icon ? <item.icon /> : null} {item.name}
                      </button>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          {authStatus && <LogoutButton />}
        </nav>
      </Container>
    </header>
  );
}
