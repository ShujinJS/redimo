import { useEffect, useContext } from 'react';
// Apollo custom hooks
import useGetMovies from '../../Apollo/hooks/Movies/useGetMovies';
// Styling
import './movies.page.style.scss';
import '../../scss/products/products.style.scss'
import '../../scss/product-listing/product-listing.style.scss'
// Components
import SideFilterComponent from '../../components/side-filter-component/side.filter.component';
import ProductComponent from '../../components/product.component/product.component';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function MoviesPage (props) {
    const { loading, error, data } = useGetMovies();
    console.log(data)

    useEffect(() => {
        
    }, [data]);  

    if(loading) return "Loading...";
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) return (
        <div className="productsPageContainer">
            <div className="productsCollectionContainer">
                <div className="content-container">
                    <ul className="item-list">
                        {data.getMovies.map(item => {
                            console.log(item)
                            const { _id } = item;
                            return(
                            <li key={_id}>
                                <ProductComponent item={item}/>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps ( state ) {
    let { selectedProduct } = state.productDetailReducer;
    return { selectedProduct };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);