import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HeaderData } from "../App";

interface HeaderProps {
  handleScroll: (sectionRef: any) => void;
  aboutRef: any;
  projectsRef: any;
  headerData: HeaderData;
}
function Header({ handleScroll, projectsRef, aboutRef ,headerData}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('')
  const location = useLocation();
  const pathname = location.pathname;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log('pathname',pathname)
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-blue-700 header">
      <nav className=" border-gray-200 dark:bg-gray-900 bg-white-transparent">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={`${headerData.logo}`} className="h-8" alt="Flowbite Logo" />

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Charity</span>
          </NavLink>
          <button
            data-collapse-toggle="navbar-default"
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isMenuOpen ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={`${pathname === '/' ? 'block py-2 px-3 text-white rounded  md:p-0 dark:text-white md:dark:text-blue-500' : 
                "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}`} aria-current="page">
                  Головна
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => handleScroll(aboutRef)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Про нас
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll(projectsRef)}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Наші проекти
                </button>
              </li>
              <li>
                <NavLink to="/projects-archive" className={`${pathname === '/projects-archive' ? 'block py-2 px-3 text-white rounded  md:p-0 dark:text-white md:dark:text-blue-500' : 
                "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}`}>
                  Звіти по проектам
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Контакти
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
