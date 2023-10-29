/// We're going to add some code here in main.
import { pageAlert } from "./alert.mjs";
import { loadHeaderFooter, itemCountCart } from "./utils.mjs";
import categoryList from "./categoryList.mjs";

/// We might initialized some variables.
/// We might call an API...

/// We might output some values.
pageAlert();

if (document.getElementById("categoryListArea")) {
  categoryList("categoryListArea");
}

loadHeaderFooter();

window.addEventListener("load", (event) => {
  itemCountCart(); 
});
