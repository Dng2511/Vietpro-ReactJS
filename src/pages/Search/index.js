import React from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Search = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("name");
    const [products, setProduct] = React.useState([]);
    const page = searchParams.get("page") || 1;
    const [pages, setPages] = React.useState({
        limit: 12,
    })
    React.useEffect(()=>{
        getProducts({
            params: {
                name: id,
                limit: 12,
                page: page,
            }
        }).then(({data})=>{
            setPages(data.pages);
            setProduct(data.data.docs);
        })
    },[id, page])

    

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{id}</span></div>
                    <div className="product-list card-deck">
                        {
                            products.map((item)=>{
                                return <ProductItem item={item}/>
                            })
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages = {pages}/>
                </div>
            </div>

        </>
    )
}
export default Search;