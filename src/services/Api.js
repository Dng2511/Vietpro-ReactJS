import { Http } from "./Http";
export const getProducts = (config) => Http.get("/products", config);

export const getCategories = (config)=>Http.get("/categories", config);
export const getCategory = (id, config)=> Http.get(`/categories/${id}`, config);

export const getProductsCategory = (id, config) => Http.get(`/categories/${id}/products`, config);
export const getProductDetails = (id, config) => Http.get(`/products/${id}`, config);
export const getCommentsProduct = (id, config) => Http.get(`/products/${id}/comments`, config)
export const postCommentsProduct = (id, data, config) => Http.post(`/products/${id}/comments`, data, config)
export const getSearchProduct = (id, config) => Http.get(`/products/?name=${id}`, config);

export const postOrder = (data, config) => Http.post("/orders", data, config);