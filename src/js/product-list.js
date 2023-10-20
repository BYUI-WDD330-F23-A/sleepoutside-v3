import { default as productList } from "./productList.mjs";

if (document.getElementById("prodList")) {
    productList("prodList", "tents");
  }