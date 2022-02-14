import { useContext, useEffect } from 'react';
// Styling
import "./categories.page.style.scss";
// Routing
import { useNavigate } from "react-router-dom"
// Context API
import { MainContext } from "../../context/main-context/main.context";
// Apollo Custom Hooks
import useGetSiteLanguages from "../../Apollo/hooks/Languages/useGetSiteLanguages";
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function CategoriesPage( props ) {
  let { loading, error, data } = useGetSiteLanguages();
  let { startSpinnerAction, endSpinnerAction } = props;    

  useEffect(() => {
        
  }, [data]);  

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

    if(loading) { startSpinnerAction(); return <></>};
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) { endSpinnerAction(); return (
      
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
                                  <div id="bottomTicket" className={`${darkMode ? "font-dark nav-bg-dark" : "font-light footer-bg-light"}`}>

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
    )};
};

function mapStateToProps ( state ) {

}

const mapDispatchToProps = {
  startSpinnerAction: actions.spinnerActions.startSpinnerAction,
  endSpinnerAction: actions.spinnerActions.endSpinnerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);

