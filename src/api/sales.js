import { connection } from "./axios";

export const getSales =() => connection.get('/sales');
export const newSale =(data) => connection.post('/sales',data)
export const getSaleById = (id) => connection.get(`/sales/${id}`);
export const findTicket = (type,value) => connection.get(`/sales/search?${type}=${value}`);

