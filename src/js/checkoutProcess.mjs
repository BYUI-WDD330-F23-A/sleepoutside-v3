import { getLocalStorage, clearLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifyItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifyItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  totalQuantity: 0,
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.getElementById("subtotal");
    // Calculate the total quantity as sum of all quantities.
    this.totalQuantity = this.list.reduce((a,x) => a + x.quantity, 0); 
    const itemQuantity = document.getElementById("itemQuantity");
    itemQuantity.innerText = `(${this.totalQuantity})`;  // Was formerly `(${this.list.length})`;
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  },
  calculateOrdertotal: function () {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + (this.totalQuantity - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.getElementById("shipping");
    const orderTotal = document.getElementById("orderTotal");
    const tax = document.getElementById("tax");
    shipping.innerText = "$" + this.shipping;
    orderTotal.innerText = "$" + this.orderTotal;
    tax.innerText = "$" + this.tax;
  },
  checkout: async function (form) {
    // Build the item object.
    const jsonData = formDataToJSON(form);
    jsonData.orderDate = new Date();
    jsonData.orderTotal = this.orderTotal;
    jsonData.shipping = this.shipping;
    jsonData.tax = this.tax;
    jsonData.items = packageItems(this.list);
    //console.log(jsonData);
    try {
      const res = await checkout(jsonData);
      console.log(res); 
      clearLocalStorage("so-cart"); //clear the local 
      location.assign("/checkout/success.html");//send to the success page
    } catch (err) {
      //console.log(err); 
      removeAllAlerts();
      for (let message in err.message) {
        //console.log(message); 
        alertMessage(err.message[message]);
      }
    }
    // Call the checkout method in external services.
  },
};

export default checkoutProcess;
