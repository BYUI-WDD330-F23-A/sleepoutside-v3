import { convertToJson } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id, category) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export function determineDiscount(product) {
  let priceLine = `${product.FinalPrice.toFixed(2)}`;
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    priceLine = `
      <span class="msrp-slashed">$${product.SuggestedRetailPrice.toFixed(2)}</span> 
      <br/>
      <p class="discount-price">
        Now $${product.FinalPrice.toFixed(2)}!
      </p>`;
  } 
  return priceLine;
}

export async function checkout(order) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
  //return await fetch("https://wdd330-backend.onrender.com/checkout/", options).then(convertToJson); 
  //console.log(res);
}