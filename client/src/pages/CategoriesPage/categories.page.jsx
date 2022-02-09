import { useContext } from 'react';
// Styling
import "./categories.page.style.scss";
// Routing
import { useNavigate } from "react-router-dom"
// Context API
import { MainContext } from "../../context/main-context/main.context";
// Apollo Custom Hooks
import useGetSiteLanguages from "../../Apollo/hooks/Languages/useGetSiteLanguages";

function CategoriesPage() {
  let { loading, error, data } = useGetSiteLanguages();

    const mainContext = useContext(MainContext);
    const darkMode = mainContext.state.darkMode;
    const siteLanguage = mainContext.state.siteLanguage;

    // Routing
    const navigate = useNavigate();

    function zoomInImage (e) {
      let currentImage = e.target;
      currentImage.style.width = "250px";
    }

    function zoomOutImage (e) {
      let currentImage = e.target;
      currentImage.style.width = "100%";
    }

    if(loading) return "Loading...";
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) return (
      
      <div id="categoriesContainer">
        <div id="categoriesGroupHolder">
          <div id="categoriesGroup">
            {data.getSiteLanguages.map(firstLvl => {
              return (
                <>
                  {siteLanguage == firstLvl.title
                  ?
                    firstLvl.content.map(secondLvl => {
                      return (
                        <>
                          {secondLvl.title == "middleNav" ? secondLvl.content.map(thirdLvl => {
                            console.log(thirdLvl)
                            return (
                              
                              <>
                              {thirdLvl.url == "categories" ? 
                              <ul>
                              {thirdLvl.content.map(categories => {
                                // Routing
                                const routeChange = () => {
                                    let path = `/${categories.url}`;
                                    navigate(path);
                                }
                                return(
                                <li onClick={routeChange}  className={`category-item`}>
                                  <div id="mainGroup" className={`${darkMode ? "footer-bg-dark" : ""}`}>
                                    <span >{categories.title}</span>

                                    <div className="category-image" >
                                      <img src={categories.bgImageUrl}/>
                                    </div>
                                  </div>
                                  <div id="bottomTicket" className={`${darkMode ? "font-dark nav-bg-dark" : "font-light bg-light"}`}>

                                  </div>


                                </li>
                                )
                              })}
                              </ul>
                              : ""}
                              </>                              
                            )
                          }):""}
                        </>
                      )
                    })
                    : ""
                  }
                </>
              )
            })}
          </div>
        </div>
      </div>
  );
};

export default CategoriesPage;
