import LatestNewsItem from "../LatestNewsItem/LatestNewsItem";
import "./latestNews.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const LatestNewsContent = ({ articlesLength }) => {
  const { currentActiveIcon, setCurrentActiveIcon } = useAppContext();

  const [newsArticles, setNewsArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const newsContainerRef = useRef(null);
  const navigate = useNavigate();

  const fetchLatestNewsArticles = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/latest-news", {
        params: { page, limit: 10 },
      });

      if (response.data.length === 0) {
        setHasMore(false);
      }

      setNewsArticles((prevArticles) => {
        const existingArticleIds = new Set(
          prevArticles.map((article) => article.id)
        );

        const newArticles = response.data.filter(
          (article) => !existingArticleIds.has(article.id)
        );

        return [...prevArticles, ...newArticles].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching news articles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNewsArticles(page);
  }, [page]);

  const handleScroll = () => {
    if (newsContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        newsContainerRef.current;

      if (
        scrollHeight - scrollTop <= clientHeight + 50 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const container = newsContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleIconClick = () => {
    setCurrentActiveIcon("home");
    navigate("/");
    localStorage.setItem("activeIcon", "home");
  };

  return (
    <div
      className={`LatestNewsContainer ${
        articlesLength <= 1 ? "single-news-article" : ""
      }`}
    >
      <div className="LatestNewsContent">
        <div className="Title">
          <div className="red-dot">
            <div className="inner-dot"></div>
          </div>
          <div>Latest News</div>
        </div>
        <div className="LatestNewsItems" ref={newsContainerRef}>
          {newsArticles.length === 0 ? (
            <div>No articles found</div>
          ) : (
            newsArticles.map((article) => (
              <div key={article.id}>
                <LatestNewsItem
                  description={article.title}
                  published={article.publishedAt}
                  id={article.id}
                />
                <hr className="LatestNewsItemsdivider" />
              </div>
            ))
          )}
          {loading && <div>Loading...</div>}
        </div>

        <div className="Footer">
          {currentActiveIcon !== "home" && (
            <>
              <div className="FooterText" onClick={handleIconClick}>
                See all news
              </div>
              <div className="FooterIcon" onClick={handleIconClick}>
                <MdKeyboardArrowRight size="20px" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsContent;
