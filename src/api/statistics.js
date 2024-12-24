import { connection } from "./axios.js";
export const getStadisticGeneral = () => connection.get("stadisctic");
export const InfoInventary =()=> connection.get("stadisctic/infoInventory");
