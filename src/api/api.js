export const getAllClothing = async ()=>{
  try {
    const res = await fetch("http://localhost:4000/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}