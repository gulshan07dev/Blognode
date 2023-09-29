import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
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
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3.5 shadow-sm bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex justify-between items-center">
          <Logo className="max-md:text-base text-3xl" />

          <ul className="flex h-fit gap-0 overflow-hidden bg-white shadow-sm border-[1px] border-gray-300 rounded-full">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="md:px-5 px-3 md:py-2 py-2 text-center font-nunito-sans md:text-lg font-[500] duration-200 hover:bg-gray-50 hover:shadow-sm border-x-[1px] border-gray-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
