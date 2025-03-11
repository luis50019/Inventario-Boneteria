import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/Search.css";
import debounce from "just-debounce-it";
import { useLocation } from "react-router";
export function Search({
  placeholder,
  getData,
  data = null,
  selectProduct = null,
}) {
  const location = useLocation();
  const debounceFind = useCallback(
    debounce((nameProduct) => {
      getData(nameProduct);
    }, 300),
    [getData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = e.target[0].value;
    getData(newName);
  };

  const handleChange = (e) => {
    const newName = e.target.value;
    debounceFind(newName);
  };

  const handlerClick = (product) => {
    selectProduct(product);
  };

  //TODO: componetizar
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="absolute mt-5 cont-search w-full"
      >
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
      {data && data.length ? (
        <div
          className={`absolute ${
            location.pathname == "/sale/newSale" ? "translate-y-[9rem]" : ""
          } flex flex-col min-h-[25rem] max-h-[25rem] overflow-y-auto w-[95%] z-30 rounded-2xl bg-[#fff] shadow-2xl px-4`}
        >
          {data[0].productName
            ? data.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex justify-between items-center min-h-20 max-h-20"
                  onClick={() => handlerClick(product)}
                >
                  <img width={"50px"} src={product.images[0]} />
                  <div className="flex flex-col items-end">
                    <span className="font-extralight">
                      {product.productName}
                    </span>
                    <span>{product.size[0]}</span>
                  </div>
                </div>
              ))
            : data.map((ticket) => (
              <div
                key={ticket._id}
                className="w-full flex justify-between items-center min-h-15 max-h-15 px-2 py-2"
                onClick={() => handlerClick(ticket._id)}
              >
                <span className="text-xl font-bold">{new Date(ticket.saleDate).toLocaleDateString("es-MX")}</span>
                <div className="flex flex-col items-end">
                  <span className="font-normal">
                    ${ticket.total}
                  </span>
                  <span>#{ticket.ticketNumber}</span>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        ""
      )}
    </>
  );
}
