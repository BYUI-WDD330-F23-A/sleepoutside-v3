/// We're going to add some code here in main.
import { default as productList } from "./productList.mjs";
import { pageAlert } from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs";

/// We might initialized some variables.
/// We might call an API...
if (document.getElementById("prodList")) {    
    productList("prodList", "tents");
}

/// We might output some values.
pageAlert();

loadHeaderFooter();
