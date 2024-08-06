import "./topbar.scss";
import { useAppContext } from "../../context/AppContext";

const Topbar = () => {
  const { isHomepage, setIsHomepage, isTopbarContent, setIsTopbarContent } =
    useAppContext();

  return (
    <div className="TopbarContainer">
      {isTopbarContent && (
        <div className="TopbarContent">
          <div className="TopbarItem">
            <div className="TopbarItemTitle">Make MyNews your homepage</div>
            <div className="TopbarItemDesc">
              Every day discover what’s trending on the internet!
            </div>
          </div>
          <div className="TopbarItem">
            {isHomepage ? (
              <>
                <button
                  onClick={() => setIsHomepage(false)}
                  className="ButtonGet"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <>
                <div
                  className="ButtonNoThanks"
                  onClick={() => setIsTopbarContent(false)}
                >
                  No, thanks
                </div>
                <button
                  onClick={() => setIsHomepage(true)}
                  className="ButtonGet"
                >
                  GET
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Topbar;
