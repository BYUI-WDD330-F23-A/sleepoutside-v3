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
  // return products.find((item) => item.Id === id);
}

export async function checkout(order) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  const result = await fetch("https://wdd330-backend.onrender.com/checkout", options);
  console.log(result);
}
