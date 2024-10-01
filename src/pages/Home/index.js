import React from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const Home = () => {
    const [prominentProducts, setProminentProducts] = React.useState([]);
    const [newProducts, setNewProduct] = React.useState([]);

    React.useEffect(() => {

        getProducts({
            params: {
                limit: 6,
                "filter[is_featured]": true,
            }
        }).then(({ data }) => setProminentProducts(data.data.docs));

        getProducts({
            params: {
                limit: 6,
            }
        }).then(({ data }) => setNewProduct(data.data.docs));
        
    }, [])
    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        newProducts.map((item) => (
                            <ProductItem item={item} />
                        ))
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        prominentProducts.map((item) => (
                            <ProductItem item={item} />
                        ))
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
        </>
    )
}
export default Home;