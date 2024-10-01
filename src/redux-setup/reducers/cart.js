import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "../../shared/constants/action-type";

const initState = {
    items: [],

}

const addToCart = (state, payload) => {
    const items = state.items;
    let isProductExist = false;
    items.map((item)=>{
        if(item._id === payload._id){
            item.qty+=payload.qty;
            isProductExist = true;
        }
        return item;
    })
    const newItem = isProductExist?items:[...items, payload];
    return {...state, items: newItem}
}

const updateCart = (state, payload) => {
    const items = state.items;
    const newItems = items.map((item)=>{
        if (item._id === payload._id) item.qty = payload.qty;
        return item;
    })
    
    return {...state, items: newItems};
}

const deleteCart = (state, payload) => {
    const items = state.items;
    const newItems = items.filter((item) =>{
        if (item._id === payload._id) return false;
        return true;
    })
    return {...state, items: newItems};
}


export default (state=initState, action) => {
    switch(action.type){
        case ADD_TO_CART: return addToCart(state, action.payload);
        case UPDATE_CART: return updateCart(state, action.payload);
        case DELETE_CART: return deleteCart(state, action.payload);
        default: return state;
    }
}