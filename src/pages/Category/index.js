import React from "react";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { useParams } from "react-router-dom";
const Category = () => {
    const params = useParams();
    const id = params.id;
    const [productsCategory, setProductsCategory] = React.useState([]);
    const [category, setCategory] = React.useState("");
    React.useEffect(() => {
        getCategory(id, {}).then(({data})=>setCategory(data.data))
        getProductsCategory(id, {}).then(({ data }) => setProductsCategory(data.data.docs));
    }, [id])
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
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div >

        </>
    )
}
export default Category;