import { Container, Logo, LogoutButton } from "../index";
import ThemeChangerBtn from "./themeChangerBtn";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaListUl, FaPlus } from "react-icons/fa";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);

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
    <header className="md:py-3.5 py-2.5 md:px-10 px-2 overflow-x-hidden shadow-sm border-b-[1px] border-b-gray-100 dark:border-b-[#2b2b2e] bg-white dark:bg-[#131315] sticky top-0 z-50 w-screen">
      <nav className="flex justify-between items-center w-full overflow-hidden">
        <Logo className="max-md:text-base text-3xl" />

        <div
          className={`
              ${
                authStatus
                  ? "max-md:fixed max-md:bottom-0 max-md:w-full max-md:flex max-md:justify-center max-md:p-3"
                  : ""
              } bg-none
            `}
        >
          <ul
            className={`flex h-fit gap-[2px] overflow-hidden shadow-sm border-[1px] dark:border-[2px] border-gray-300 dark:border-[#2b2b2e] rounded-full  bg-gray-300 dark:bg-[#2b2b2e]`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink to={`${item.slug}`}>
                    {({ isActive, isPending }) => (
                      <button
                        className={`flex items-center gap-2 ${
                          authStatus
                            ? "md:px-3.5 px-3 max-sm:px-2.5 md:py-1.5 py-2"
                            : "md:px-3 px-2.5 py-1.5"
                        }  text-center ${
                          isActive
                            ? "bg-[#f4f4ff] dark:bg-[#2e2e31] text-[#4437f0] dark:text-purple-200"
                            : "bg-white dark:bg-[#18181b]  text-gray-900 dark:text-white"
                        } font-nunito-sans md:text-lg text-base font-[500] duration-200 hover:bg-gray-50 hover:shadow-sm  `}
                      >
                        {item.icon ? <item.icon /> : null} {item.name}
                      </button>
                    )}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div
          className={`${
            authStatus
              ? "flex md:gap-12 gap-3"
              : "max-md:absolute max-md:right-[-100%]"
          } `}
        >
          {
            <ThemeChangerBtn
              className={`${
                authStatus ? "" : "max-md:fixed max-md:bottom-2 max-md:right-1"
              }`}
            />
          }
          {authStatus && <LogoutButton />}
        </div>
      </nav>
    </header>
  );
}
