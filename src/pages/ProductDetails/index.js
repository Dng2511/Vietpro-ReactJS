import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsProduct, getProductDetails, postCommentsProduct } from "../../services/Api";
import { getImgProduct } from "../../shared/ultils";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";
const ProductDetails = () => {
    const param = useParams();
    const navigate =useNavigate();
    const id = param.id;
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = React.useState({});
    const {name, image, accessories, status, promotion, price, is_stock, details} = productDetails;
    const [commentsList, setComment] = React.useState([]);
    const [inputComment, setInputComment] = React.useState([]);
    const getComment = (id) => getCommentsProduct(id, {}).then(({ data }) => setComment(data.data.docs));
    React.useEffect(() => {
        getProductDetails(id, {}).then(({ data }) => setProductDetails(data.data));
        getComment(id);
    }, [id]);
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputComment({ ...inputComment, [name]: value })
    }

    const onSubmitComment = (e) => {

        e.preventDefault()
        postCommentsProduct(id, inputComment, {}).then(({ data }) => {
            if (data.status == "success") setInputComment("");
            getComment(id);
        })
    }


    const addToCart = (type) =>{
        dispatch({
            type: ADD_TO_CART,
            payload: {
                _id: id,
                name: name,
                image: image,
                price: price,
                qty: 1,
            }
        })
        if (type ==="buy-now") {
            return navigate("/Cart");
        }
    }



    return (
        <>
            <div>
                {/*	List Product	*/}
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImgProduct(image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{name}</h1>
                            <ul>
                                <li><span>Bảo hành:</span> 12 Tháng</li>
                                <li><span>Đi kèm:</span> {accessories}</li>
                                <li><span>Tình trạng:</span> {status}</li>
                                <li><span>Khuyến Mại:</span>{promotion}</li>
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number">{price}</li>
                                <li id="status">{is_stock ? "Còn hàng" : "Hết hàng"}</li>
                            </ul>
                            <div id="add-cart">
                                <button onClick={() => addToCart("buy-now")} className="btn btn-warning mr-2">Mua ngay</button>
                                <button onClick={() => addToCart()} className="btn btn-info">Thêm vào giỏ hàng</button>
                            </div>


                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Đánh giá về iPhone X 64GB</h3>
                            <p>{details}</p>
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input onChange={onChangeInput} name="full_name" required type="text" className="form-control" value={inputComment.full_name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input onChange={onChangeInput} name="email" required type="email" className="form-control" id="pwd" value={inputComment.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Nội dung:</label>
                                    <textarea onChange={onChangeInput} name="body" required rows={8} className="form-control" defaultValue={""} value={inputComment.body || ""} />
                                </div>
                                <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    <div id="comments-list" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {commentsList.map((cmt) => {

                                return (
                                    <div className="comment-item">
                                        <ul>
                                            <li><b>{cmt.full_name}</b></li>
                                            <li>{moment(cmt.updatedAt).fromNow()}</li>
                                            <li>
                                                <p>{cmt.body}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })

                            }
                        </div>
                    </div>
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}
export default ProductDetails;