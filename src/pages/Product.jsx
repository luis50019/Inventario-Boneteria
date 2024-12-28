import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UseContextApp } from "../context/AppContext";
import ProductForm from "../components/Form/ProductForm";
const URL_IMG =
  "https://w7.pngwing.com/pngs/853/276/png-transparent-gray-crew-neck-shirt-t-shirt-polo-shirt-clothing-grey-t-shirt-tshirt-fashion-active-shirt-thumbnail.png";

export default function Product() {
  let { id } = useParams();
  const { getProduct } = UseContextApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
				console.log(data);
        setProduct(data);
      } catch (error) {
        setError("Hubo un error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    if(id)fetchProduct();
  },[id]);

  return (
    <>
			<h1 className="text-4xl text-[#f34c1a] font-extralight pl-2 mt-5">{product?.productName || ""}</h1>
      <div className="w-full box-border mt-5 bg-[#f8f7f7] h-96 flex justify-center items-center">
				<img
					src={URL_IMG}
					alt={"imagen de una prenda de ropa"}
					className="object-cover h-full"
				/>
			</div>
			<ProductForm product={product} />
    </>
  );
}
