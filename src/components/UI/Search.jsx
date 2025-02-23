import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Search.css";
import debounce from "just-debounce-it";
import { useFindProduct } from "../../hooks/useFindProduct.js";
export function Search({ placeholder, selectProduct = null }) {
  const { getProductsByName, productsFind, setProductsFind} = useFindProduct();

  const debounceFind = useCallback(
    debounce((nameProduct) => {
      getProductsByName(nameProduct);
    }, 300),
    [getProductsByName]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = e.target.value;
    debounceFind(newName);
  };

  const handleChange = (e) => {
    const newName = e.target.value;
    debounceFind(newName);
  };

  const handlerClick =(product)=>{
    selectProduct(product);
    setProductsFind([]);

  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5 cont-search w-full">
        <input
          type="text"
          onChange={handleChange}
          placeholder={placeholder}
          className="input-search "
        />
        <button className="btn-search z-10">
          <FaSearch />
        </button>
      </form>
      {productsFind && productsFind.length?(
        <div className="absolute translate-y-36 flex flex-col min-h-[25rem] max-h-[25rem] overflow-y-auto min-w-[20rem] max-w-[20rem] z-30 rounded-2xl bg-[#fff] shadow-2xl px-4" >
          {productsFind.map((product) => (
            <div key={product._id} className="w-full flex justify-between items-center min-h-20 max-h-20" onClick={()=>handlerClick(product)}>
              <img width={"50px"} src={product.images[0]} />
              <div className="flex flex-col items-end">
                <span className="font-extralight">{product.productName}</span>
                <span>{product.size[0]}</span>
              </div>
            </div>
          ))}
        </div>
      ):""
    }
    </>
  );
}
