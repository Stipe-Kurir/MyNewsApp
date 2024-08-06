import SearchBar from "../SearchBar/SearchBar";
import "./header.scss";
import { FaBars } from "react-icons/fa";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { setCurrentActiveIcon, isMenuOpen, setIsMenuOpen } = useAppContext();

  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogo = () => {
    navigate("/home");
    setCurrentActiveIcon("home");
    localStorage.setItem("activeIcon", "home");
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

  return (
    <div className="HeaderContainer">
      <div className="HeaderContent">
        <div className="HeaderTop">
          <img
            src="/images/MyNews.png"
            alt="MyNews Logo"
            className="logo"
            onClick={handleLogo}
          />
          <FaBars
            className="hamburgerMenu"
            width="15px"
            height="15px"
            onClick={handleMenuToggle}
          />
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
