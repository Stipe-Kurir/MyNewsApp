import "./contentItem.scss";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ContentItem = ({
  category,
  title,
  favorites,
  onFavoriteToggle,
  id,
  author,
  image,
  breakingNews,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/article/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  return (
    <div className="ContentItemContainer" onClick={() => handleItemClick(id)}>
      {breakingNews ? (
        <div className="BreakingNewsContainer">
          <div className="BreakingNewsLabel">BREAKING</div>
          <div className="BreakingNewsTitle"> {title}</div>
          <div className="BreakingNewsAuthor">{author}</div>
        </div>
      ) : (
        <>
          <div className="ImageContainer">
            {image ? (
              <img src={image} alt="Article Image" />
            ) : (
              <div className="placeholder">No Image Available</div>
            )}
          </div>
          <div className="ItemsContainer">
            <div className="HeaderRow">
              <div className="ArticleItemCategory">{category}</div>
              <div
                style={{ marginRight: "10px" }}
                onClick={handleFavoriteClick}
              >
                {favorites ? (
                  <BsFillBookmarkFill
                    title="Remove from favorites"
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <BsBookmark
                    title="Add to favorites"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>

            <div className="ArticleItemTitle">{title}</div>
            <div className="ArticleItemAuthor">{author}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentItem;
