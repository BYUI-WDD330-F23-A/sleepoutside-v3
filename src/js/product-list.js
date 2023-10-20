import { default as productList } from "./productList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const categoryTitle = document.getElementById("categoryTitle");

if (document.getElementById("prodList")) {
  productList("prodList", category);
  categoryTitle.style = "text-transform: capitalize";
  categoryTitle.innerHTML = category;
}
