import React, { useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import {
  BiSolidBriefcaseAlt,
  BiSolidFirstAid,
  BiBookBookmark,
} from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { PiSoccerBallFill } from "react-icons/pi";
import { FiMonitor } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import "./navbar.scss";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const {
    currentActiveIcon,
    setCurrentActiveIcon,
    isMenuOpen,
    setIsMenuOpen,
    setSearchQuery,
  } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { id: "home", icon: <IoMdHome />, label: "Home" },
    { id: "general", icon: <IoNewspaperOutline />, label: "General" },
    { id: "business", icon: <BiSolidBriefcaseAlt />, label: "Business" },
    { id: "health", icon: <BiSolidFirstAid />, label: "Health" },
    { id: "science", icon: <MdOutlineScience />, label: "Science" },
    { id: "sports", icon: <PiSoccerBallFill />, label: "Sports" },
    { id: "technology", icon: <FiMonitor />, label: "Technology" },
    { id: "favorites", icon: <BiBookBookmark />, label: "Favorites" },
  ];

  const handleIconClick = (iconName) => {
    setCurrentActiveIcon(iconName);
    setSearchQuery("");
    navigate(`/${iconName}`);
    if (window.innerWidth < 950) {
      setIsMenuOpen(false);
    }
    localStorage.setItem("activeIcon", iconName);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth > 950) {
      setIsMenuOpen(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const savedIcon = localStorage.getItem("activeIcon");
    if (savedIcon) {
      setCurrentActiveIcon(savedIcon);
    }
  }, [setCurrentActiveIcon]);

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (items.some((item) => item.id === path) && path !== currentActiveIcon) {
      setCurrentActiveIcon(path);
    }
  }, [location.pathname, currentActiveIcon, items, setCurrentActiveIcon]);

  return (
    <>
      <div className="NavbarContainer">
        <div className="NavbarContent">
          {items.map((item) => (
            <div
              key={item.id}
              className={`NavbarItem ${
                currentActiveIcon === item.id ? "active" : ""
              }`}
              onClick={() => handleIconClick(item.id)}
            >
              <div
                className={`icon ${
                  currentActiveIcon === item.id ? "active" : ""
                }`}
              >
                {item.icon}
              </div>
              <div
                className={`text ${
                  currentActiveIcon === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div className="FullScreenMenu">
          <div className="FullScreenMenuContent">
            <div className="closeMenu">
              <FaTimes
                onClick={handleMenuToggle}
                width="15px"
                height="15px"
                style={{ marginRight: "15px" }}
              />
            </div>
            <div className="menuTitle">
              <img
                src="./images/MyNews.png"
                alt="MyNews Logo"
                className="logo"
                onClick={() => handleIconClick("home")}
              />
            </div>
            <SearchBar />
            <div className="menuCategoriesContent">
              <div className="menuCategories">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`menuCategory ${
                      currentActiveIcon === item.id ? "active" : ""
                    }`}
                    onClick={() => handleIconClick(item.id)}
                  >
                    <div
                      className={`icon ${
                        currentActiveIcon === item.id ? "active" : ""
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`text ${
                        currentActiveIcon === item.id ? "active" : ""
                      }`}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
