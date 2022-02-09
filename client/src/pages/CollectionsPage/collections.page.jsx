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
    console.log(data)

    // Merging a new collections array with each object contains arrays
    var collectionsData = [];
    var collections = [];
    if(data) collectionsData = Object.values(data);
    console.log(collectionsData);
    if(data) collections = [].concat.apply([], collectionsData)
    console.log(collections);

    useEffect(() => {

    }, [data]);  

    if(loading) return "Loading...";
    if(error) return `Bir hata meydana geldi: ${error}`;
    if(data) return (
        <div className="productsPageContainer">
            <div className="productsCollectionContainer">
                <div className="content-container">
                    <ul className="item-list">
                        {collections.map(item => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsPage);