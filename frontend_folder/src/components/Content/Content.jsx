import React, { useState, useEffect } from "react";
import ContentItem from "../ContentItem/ContentItem";
import LatestNewsContent from "../LatestNewsContent/LatestNews";
import Navbar from "../Navbar/Navbar";
import "./content.scss";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const Content = () => {
  const {
    activeCategory,
    setActiveCategory,
    currentActiveIcon,
    searchQuery,
    setSearchQuery,
  } = useAppContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async (activeIcon) => {
    try {
      const url =
        activeIcon === "favorites"
          ? `http://localhost:3000/articles/favorites`
          : `http://localhost:3000/news/${activeIcon}`;
      const response = await axios.get(url);

      const sortedArticles = response.data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles(currentActiveIcon);
    localStorage.setItem("activeIcon", currentActiveIcon);
  }, [currentActiveIcon]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFavoriteToggle = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/article/${id}`);
      fetchArticles(currentActiveIcon);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const filteredArticles = searchQuery
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles;

  return (
    <div className="ContentContainer">
      <div className="ContentItems">
        <Navbar />
        <div className="ContentMain">
          <div className="ContentMainTitle">
            <div className="NewsTitle">News</div>
            {isMobile && (
              <div className="NewsCategory">
                <div
                  className={`NewsCategoryButton ${
                    activeCategory === "Featured" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Featured")}
                >
                  Featured
                </div>
                <div
                  className={`NewsCategoryButton ${
                    activeCategory === "Latest" ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick("Latest")}
                >
                  Latest
                </div>
              </div>
            )}
          </div>
          <div
            className={`ContentArticles ${
              filteredArticles.length <= 1 ? "single-article" : ""
            }`}
          >
            {filteredArticles.length === 0 ? (
              isMobile && activeCategory === "Latest" ? (
                <LatestNewsContent articlesLength={filteredArticles.length} />
              ) : (
                <div className="NoArticlesMessage">No articles found...</div>
              )
            ) : isMobile ? (
              activeCategory === "Featured" ? (
                filteredArticles.map((article) => (
                  <ContentItem
                    content={article.content}
                    key={article.id}
                    id={article.id}
                    category={article.category}
                    title={article.title}
                    favorites={article.favorites}
                    image={article.image}
                    author={article.author}
                    onFavoriteToggle={handleFavoriteToggle}
                    breakingNews={article.breakingNews}
                  />
                ))
              ) : (
                <LatestNewsContent articlesLength={filteredArticles.length} />
              )
            ) : (
              filteredArticles.map((article) => (
                <ContentItem
                  content={article.content}
                  key={article.id}
                  id={article.id}
                  category={article.category}
                  title={article.title}
                  favorites={article.favorites}
                  image={article.image}
                  author={article.author}
                  onFavoriteToggle={handleFavoriteToggle}
                  breakingNews={article.breakingNews}
                />
              ))
            )}
            {!isMobile && (
              <LatestNewsContent articlesLength={filteredArticles.length} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
