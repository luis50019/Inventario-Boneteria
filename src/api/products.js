import { connection } from './axios';

export const getAllProducts = ()=> connection.get('products');
export const getTopProducts =()=> connection.get('products/top');
export const getProductsAboutToEnd =()=> connection.get('products/aboutToend');
export const getProductSpecific =(id)=> connection.get(`products/${id}`);
export const addProduct = (product)=> connection.post('products',product);
export const getCategories =()=>connection.get('products/categories');
export const getSizeByCategory =(idCategory)=> connection.get(`products/size/${idCategory}`);
export const getGenders =()=>connection.get('products/genders');
export const editByProduct = (id,product)=> connection.put(`products/${id}`,product);
export const deleteByProduct = (id)=> connection.delete(`products/${id}`);

