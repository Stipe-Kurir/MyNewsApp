import React, { useEffect, useState } from "react";
import "./searchBar.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SearchBar = () => {
  const navigate = useNavigate();

  const {
    activeCategory,
    setActiveCategory,
    currentActiveIcon,
    setCurrentActiveIcon,
    isMenuOpen,
    setIsMenuOpen,
    setSearchQuery,
    inputValue,
    setInputValue,
  } = useAppContext();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a value");
    } else {
      setSearchQuery(inputValue);
      setCurrentActiveIcon("home");
      setActiveCategory("Featured");
      setIsMenuOpen(false);
      setInputValue("");
      navigate("/home");
      localStorage.setItem("activeIcon", "home");
    }
  };

  useEffect(() => {
    setInputValue("");
    localStorage.setItem("activeIcon", currentActiveIcon);
  }, [currentActiveIcon, activeCategory]);

  return (
    <div className="searchBarContainer">
      <div className={isMenuOpen ? "searchBarMenu" : "searchBar"}>
        <div className="searchIcon">
          <FaSearch width="15px" height="15px" onClick={handleSearchClick} />
        </div>
        <input
          type="text"
          placeholder="Search news"
          className="searchInput"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="searchButton" onClick={handleSearchClick}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
