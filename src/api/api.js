export const getAllClothing = async ()=>{
  try {
    const res = await fetch("https://backendboneteria.onrender.com");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}