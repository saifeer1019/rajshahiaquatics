"use client";

import { useEffect, useState } from "react";

import AddToCart from "./AddToCart";
import Add from "./Add";

const CustomizeProducts = ({
  productName,
  variants,
  productOptions,
  setSelectedVariant, // New prop
  selectedVariant,
  quantity,
  setQuantity,
  setPrice,
  price,
  image 

}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  let variantNames = [""]
  selectedVariant ? variantNames = Object.values(selectedVariant.choices) : null


  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);

  }, [selectedOptions]);

  const handleOptionSelect = (optionType, choice) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
    setPrice(selectedVariant.variant.priceData.price)

  };

  const isVariantInStock = (choices) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity > 0
      );
    });
  };


  console.log()
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name]: choice.description,
              });

              const selected =
                selectedOptions[option.name] === choice.description;

                const clickHandler =  () => handleOptionSelect(option.name, choice.description);

              return  (
                <li
                  className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#FBCFE8"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
      productName={productName}
      variant={variantNames || [""]}
      stockNumber={selectedVariant?.stock?.quantity || 0}
      quantity={quantity} // Pass down quantity
      setQuantity={setQuantity}
      selectedVariant={selectedVariant} 
      setSelectedVariant={setSelectedVariant}
      setPrice={setPrice}
      price={price}
      image ={image}
    />
    </div>
  );
};

export default CustomizeProducts;