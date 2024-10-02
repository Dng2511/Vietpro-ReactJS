import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImgProduct } from "../../shared/ultils";
import {currencyType} from "../../shared/constants/currency-type";
import { UPDATE_CART, DELETE_CART } from "../../shared/constants/action-type";
import { postOrder } from "../../services/Api";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const navigate = useNavigate();
    const items = useSelector(({ cart }) => cart.items);
    const dispatch = useDispatch();
    const [info, setInfo] = React.useState({});
    /* const emailRegex = /[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}/; */
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const onChangeInfo = (e) => {
        const {name, value} = e.target;
        setInfo({...info, [name]: value});
    }
    const updateCart = (id, e) => {
        const qty = parseInt(e.target.value); 
        if (qty <=0) deleteCart(e, id)
        dispatch({
            type: UPDATE_CART,
            payload:{
                _id: id,
                qty: parseInt(qty),
            }
        })
        
    }
    const deleteCart = (e, id) =>{
        e.preventDefault();
        dispatch({
            type: DELETE_CART,
            payload: {
                _id: id,
            }
        })
    }

    const order = (e) => {
        e.preventDefault();
        const orderInfo = {...info, items}
        /* if (!emailRegex.test(orderInfo.email)) alert("email không hợp lệ"); */
        if (!phoneRegex.test(orderInfo.phone)) alert("số điện thoại không hợp lệ");
        else if (orderInfo.items.length < 1) alert("Giỏ hàng trống");
        else {
            postOrder(orderInfo, {}).then(({data}) => {
                if (data.status == "success") {
                    items.map((item) => {
                        dispatch({
                            type: DELETE_CART,
                            payload: {
                                _id: item._id,
                            }
                        })
                    })
                    navigate('/Success');
                } else alert("Đặt hàng thất bại!");
            })
        };

    }

    return (
        <>
            <div>
                {/*	Cart	*/}
                <div id="my-cart">
                    <div className="row">
                        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                        <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                        <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                    </div>
                    <form method="post">
                            {
                                items.map((item) =>{
                                      return (<div className="cart-item row">
                                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                                <img src={getImgProduct(item.thumbnail)} />
                                                <h4>{item.name}</h4>
                                            </div>
                                            <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                                <input type="number" id="quantity" className="form-control form-blue quantity" onChange={(e) => updateCart(item._id, e)}  value = {item.qty}></input>
                                            </div>
                                            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{currencyType(item.qty*item.price)}</b><a onClick={(e) => deleteCart(e, item._id)} href = "#">Xóa</a></div>
                                        </div>)
                                })
                            }
                        

                        <div className="row">
                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                            </div>
                            <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{currencyType(items.reduce((total, item)=>total + item.qty*item.price, 0))}</b></div>
                        </div>
                    </form>
                </div>
                {/*	End Cart	*/}
                {/*	Customer Info	*/}
                <div id="customer">
                    <form method="post">
                        <div className="row">
                            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={(e) => onChangeInfo(e)} placeholder="Họ và tên (bắt buộc)" type="text" name="name" className="form-control" required />
                            </div>
                            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={(e) => onChangeInfo(e)} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required />
                            </div>
                            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                                <input onChange={(e) => onChangeInfo(e)} placeholder="Email (bắt buộc)" type="email" name="mail" className="form-control" required />
                            </div>
                            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                <input onChange={(e) => onChangeInfo(e)} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="add" className="form-control" required />
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a onClick={(e) => order(e)} href="#">
                                <b>Mua ngay</b>
                                <span>Giao hàng tận nơi siêu tốc</span>
                            </a>
                        </div>
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a>
                                <b>Trả góp Online</b>
                                <span>Vui lòng call (+84) 0988 550 553</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/*	End Customer Info	*/}
            </div>

        </>
    )
}
export default Cart;