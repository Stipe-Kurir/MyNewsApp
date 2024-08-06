import Header from "../../components/Header/Header";
import LatestNewsContent from "../../components/LatestNewsContent/LatestNews";
import Navbar from "../../components/Navbar/Navbar";
import Topbar from "../../components/Topbar/Topbar";
import ArticleItem from "../../components/ArticleItem/ArticleItem";
import "./article.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const Article = () => {
  const { isTopbarContent } = useAppContext();

  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/article/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!article) return;
    try {
      await axios.patch(`http://localhost:3000/article/${id}`);
      fetchArticle();
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ArticleContainer">
      {isTopbarContent && <Topbar />}
      <Header />
      <hr className="divider" />
      <div className="ArticalContentContainer">
        <div className="ArticalContentItems">
          <Navbar />
          <div className="ArticalContentItemsMain">
            <ArticleItem
              onFavoriteToggle={handleFavoriteToggle}
              title={article.title}
              category={article.category}
              image={article.image}
              author={article.author}
              content={article.content}
              favorites={article.favorites}
            />
            <div className="LatestNewsContainerItem">
              <LatestNewsContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
