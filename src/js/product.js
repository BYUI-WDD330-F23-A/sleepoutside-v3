import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

let productId = getParam("product");
productDetails(productId);
