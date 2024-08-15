import { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false); // New state for catalog dropdown in mobile

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-between font-bold border-b-[1.5px] border-b-richblack-900">
      <div className="flex w-full items-center justify-between px-4 md:w-11/12 md:max-w-maxContent md:px-0">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Hamburger Menu for mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <AiOutlineClose fontSize={24} className="text-richblack-100" />
          ) : (
            <AiOutlineMenu fontSize={24} className="text-richblack-100" />
          )}
        </button>

        {/* Centered Navigation Links and ProfileDropdown for Desktop */}
        <nav className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-[#2B84EA]"
                        : "text-richblack-900"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[100%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-0 flex-col rounded-lg bg-richblack-5 p-4 border border-richblack-900 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5 border-t border-t-richblack-900 border-l border-l-richblack-900"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter(
                              (subLink) => subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-700 hover:text-richblack-25"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-[#2B84EA] "
                          : "text-richblack-900"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Links and ProfileDropdown */}
        <div className="hidden md:flex items-center gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border bg-[#2B84EA] px-[12px] py-[8px] text-white hover:scale-95 transition-all duration-200">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border bg-[#2B84EA] px-[12px] py-[8px] text-white hover:scale-95 transition-all duration-200">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>

      {/* Mobile View - Slide-out Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 z-50 w-full bg-richblack-900 text-white md:hidden">
          <div className="flex flex-col items-center p-4">
            {/* Centered ProfileDropdown */}
            {token !== null && (
              <div className="mb-4 w-full flex justify-center">
                <ProfileDropdown />
              </div>
            )}

            {/* Centered Navigation Links */}
            <nav className="w-full">
              <ul className="flex flex-col items-center gap-4">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div
                        className="flex flex-col items-center w-full cursor-pointer"
                        onClick={() => setCatalogOpen(!catalogOpen)}
                      >
                        <div className="flex items-center justify-center">
                          <p>{link.title}</p>
                          <BsChevronDown />
                        </div>
                        {catalogOpen && (
                          <div className="w-full mt-2">
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks.length ? (
                              <>
                                {subLinks
                                  ?.filter(
                                    (subLink) =>
                                      subLink?.courses?.length > 0
                                  )
                                  ?.map((subLink, i) => (
                                    <Link
                                      to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="block py-2 pl-4 hover:bg-richblack-700 hover:text-richblack-25"
                                      key={i}
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className="text-xl"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Links at the Bottom */}
            {token === null && (
              <>
                <Link to="/login">
                  <button
                    className="mt-4 w-full rounded-[8px] border bg-[#2B84EA] px-4 py-2 text-white hover:scale-95 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="mt-4 w-full rounded-[8px] border bg-[#2B84EA] px-4 py-2 text-white hover:scale-95 transition-all duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
