import { connection } from "./axios";

export const getSales =() => connection.get('/sales');
export const getSaleById = (id) => connection.get(`/sales/${id}`);  

