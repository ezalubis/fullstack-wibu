import { Link } from "react-router-dom";
import logoEP from "../assets/logoEP.png";
// import { api } from "../utils";
export default function Nav() {
  // const navigate = useNavigate();
  const handleLogout = () => {
    alert("success");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <img src={logoEP} className="h-16 mr-1" />
          </a>
          <div className="flex md:order-2">
            {/* <Link to={"/login"}> */}
            <button
              type="button"
              onClick={handleLogout}
              className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log-out
            </button>
            {/* </Link> */}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link to={"/"}>
                <a
                  className="block py-2 pl-3 pr-4 text-gray-900  rounded md:bg-transparent  md:p-0 md:hover:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
              <Link to={"/cart"}>
                <a className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ">
                  Cart
                </a>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
