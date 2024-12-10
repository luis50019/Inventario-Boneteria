import { connection } from "./axios.js";
export const getStadisticGeneral = () => connection.get("stadisctic");