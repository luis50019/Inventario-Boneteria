export const getAllClothing = async ()=>{
  try {
    const res = await fetch("https://backendappboneteriac.onrender.com/products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}