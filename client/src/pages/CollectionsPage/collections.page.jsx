import { useEffect, useContext } from 'react';
// Apollo custom hooks
import useGetCollections from '../../Apollo/hooks/Collections/useGetCollections';
// Styling
import '../../scss/product-listing/product-listing.style.scss'
import '../../scss/products/products.style.scss'
// Components
import SideFilterComponent from '../../components/side-filter-component/side.filter.component';
import ProductComponent from '../../components/product.component/product.component';
// Redux
import { connect } from "react-redux";
import * as actions from "../../redux/_actions/actions";

function CollectionsPage (props) {

    const { loading, error, data } = useGetCollections();
    let { startSpinnerAction, endSpinnerAction } = props;    

    // Merging a new collections array with each object contains arrays
    var collectionsData = [];
    var collections = [];
    if(data) collectionsData = Object.values(data);
    if(data) collections = [].concat.apply([], collectionsData)

    useEffect(() => {

    }, [data]);  

    if(loading) { startSpinnerAction(); return <></> }
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) { endSpinnerAction(); return (
        <div className="productsPageContainer">
            <div className="productsCollectionContainer">
                <div className="content-container">
                    <ul className="item-list">
                        {collections.map(item => {
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
    )}
}

function mapStateToProps ( state ) {
    let { selectedProduct } = state.productDetailReducer;
    return { selectedProduct };
}

const mapDispatchToProps = {
    getProductDetailAction: actions.productDetailActions.getProductDetailAction,
    clearProductDetailAction: actions.productDetailActions.clearProductDetailAction,
    startSpinnerAction: actions.spinnerActions.startSpinnerAction,
    endSpinnerAction: actions.spinnerActions.endSpinnerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsPage);