import "./category.scss";
import Topbar from "../../components/Topbar/Topbar";
import Header from "../../components/Header/Header";
import Content from "../../components/Content/Content";
import { useAppContext } from "../../context/AppContext";

const Category = () => {
  const { isTopbarContent } = useAppContext();

  return (
    <div className="CategoryContainer">
      {isTopbarContent && <Topbar />}
      <Header />
      <hr className="divider" />
      <Content />
    </div>
  );
};
export default Category;
