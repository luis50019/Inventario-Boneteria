import { connection } from "./axios.js";
export const getStadisticGeneral =async()=>{
  try{
    const data = await connection.get('stadisctic');
    return data;
  }catch(error){
    console.log(error);
  }
}