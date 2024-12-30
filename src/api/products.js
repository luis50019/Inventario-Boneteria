import { connection } from './axios';

export const getAllProducts = ()=> connection.get('products');
export const getTopProducts =()=> connection.get('products/top');
export const getProductsAboutToEnd =()=> connection.get('products/aboutToend');
export const getProductSpecific =(id)=> connection.get(`products/${id}`);
export const addProduct = (product)=> connection.post('products',product);  
