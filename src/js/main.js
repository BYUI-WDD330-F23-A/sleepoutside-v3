/// We're going to add some code here in main.
import { default as productList } from "./productList.mjs";
import { pageAlert } from "./alert.mjs";

/// We might initialized some variables.
/// We might call an API...
productList("prodList", "tents");

/// We might output some values.
pageAlert();