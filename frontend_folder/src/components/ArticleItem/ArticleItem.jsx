import "./articleItem.scss";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

const ArticleItem = ({
  title,
  category,
  image,
  author,
  content,
  favorites,
  onFavoriteToggle,
}) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <div className="ArticleItemContainer">
      <div className="ArticleItemContainerItems">
        <div className="articleHeader">
          <div className="articleTitle">{title}</div>
          <div onClick={handleFavoriteClick}>
            {favorites ? (
              <BsFillBookmarkFill
                title="Remove from favorites"
                style={{ cursor: "pointer" }}
                size={18}
              />
            ) : (
              <BsBookmark
                title="Add to favorites"
                style={{ cursor: "pointer" }}
                size={18}
              />
            )}
          </div>
        </div>

        <div className="articleCategory">{category}</div>
        <div>{author}</div>
        <div className="articleImage">
          {image ? (
            <img src={image} alt="Article" />
          ) : (
            <div className="placeholder">No Image Available</div>
          )}
        </div>

        <div className="articleDescription">{content}</div>
      </div>
    </div>
  );
};
export default ArticleItem;
