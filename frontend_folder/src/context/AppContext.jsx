import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentActiveIcon, setCurrentActiveIcon] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [inputValue, setInputValue] = useState("");
  const [isHomepage, setIsHomepage] = useState(false);
  const [isTopbarContent, setIsTopbarContent] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        searchQuery,
        setSearchQuery,
        currentActiveIcon,
        setCurrentActiveIcon,
        activeCategory,
        setActiveCategory,
        inputValue,
        setInputValue,
        isHomepage,
        setIsHomepage,
        isTopbarContent,
        setIsTopbarContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
