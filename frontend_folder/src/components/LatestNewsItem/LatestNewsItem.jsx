import "./latestNewsItem.scss";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const LatestNewsItem = ({ description, published, id }) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/article/${id}`);
  };

  const formattedDate = format(new Date(published), "MMMM d, yyyy h:mm a");

  return (
    <div className="LatestNewsItemContent" onClick={() => handleItemClick(id)}>
      <div className="Time">{formattedDate}</div>
      <div className="LatestNewsItemTitle">{description}</div>
    </div>
  );
};

export default LatestNewsItem;
