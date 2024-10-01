import { currencyType } from "../constants/currency-type";
import { getImgProduct } from "../ultils";
import { Link } from "react-router-dom";
const ProductItem = ({item}) => {
    
    return (
        <div className="product-item card text-center">
            <Link to={`/ProductDetails-${item._id}`}><img src={getImgProduct(item.image)} /></Link>
            <h4><Link to={`/ProductDetails-${item._id}`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{currencyType(item.price)}</span></p>
        </div>
    )
}
export default ProductItem;