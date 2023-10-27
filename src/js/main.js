/// We're going to add some code here in main.
import { pageAlert } from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import categoryList from "./categoryList.mjs";

/// We might initialized some variables.
/// We might call an API...

/// We might output some values.
pageAlert();

if (document.getElementById("categoryListArea")) {
  categoryList("categoryListArea");
}

loadHeaderFooter();
// window.addEventListener("load", (event) => {
//   console.log("page is fully loaded");
//   document.getElementById('checkoutBtn') = function () {
//     location.href = "www.youtube.com";
//   };
// })
