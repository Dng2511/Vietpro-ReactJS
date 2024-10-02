import React from "react";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";
const Category = () => {
    const params = useParams();
    const id = params.id;
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const [pages, setPages] = React.useState({});
    const [productsCategory, setProductsCategory] = React.useState([]);
    const [category, setCategory] = React.useState("");
    React.useEffect(() => {
        getCategory(id, {}).then(({data})=>setCategory(data.data))
        getProductsCategory(id, {
            params: {
                limit: 12,
                page: page,
            }
        }).then(({ data }) => {
            setProductsCategory(data.data.docs);
            setPages(data.pages);
    });
    }, [id, page])
    console.log(category)
    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <h3>{category.name} (hiện có {productsCategory.length} sản phẩm)</h3>
                    <div className="product-list card-deck">
                        {
                            productsCategory.map((item) => (
                                <ProductItem item={item} />
                            ))
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages = {pages}/>
                </div>
            </div >

        </>
    )
}
export default Category;