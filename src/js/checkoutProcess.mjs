import { getLocalStorage, clearLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

/* Validation */
function validStyle() {
  return `border: 3px solid green; background: linear-gradient(to right, rgba(126, 181, 178, 0.5), rgba(71, 199, 175, 0.5), rgba(0, 214, 152, 0.5), rgba(11, 226, 108, 0.5), rgba(88, 235, 18, 0.5));`
}

function invalidStyle() {
  return `border: 3px dashed red;`
}

const firstName = document.getElementById("fname"); 
const lastName = document.getElementById("lname"); 
const streetName = document.getElementById("street"); 
const cityName = document.getElementById("city"); 
const stateName = document.getElementById("state"); 
const zipCode = document.getElementById("zip"); 
const creditCardNumber = document.getElementById("cardNumber"); 
const expirationDate = document.getElementById("expiration"); 
const codeNumber = document.getElementById("code")

firstName.addEventListener("input", () => {
  const fnamePattern = /^[A-Za-z]+$/; 
  const userfname = firstName.value;  
  if (fnamePattern.test(userfname)) {
    firstName.style.cssText = validStyle(); 
  } else {
    //firstName.setCustomValidity("Please enter a valid input. Only Letters")
    firstName.style.cssText = invalidStyle(); 
  }
});

lastName.addEventListener("input", () => {
  const lnamePattern = /^[A-Za-z]+$/; 
  const userlname = lastName.value;  
  if (lnamePattern.test(userlname)) {
    lastName.style.cssText = validStyle();
  } else {
    //lastName.setCustomValidity("Please enter a valid input. Only Letters")
    lastName.style.cssText = invalidStyle();
  }
});

streetName.addEventListener("input", () => {
  const stnamePattern = /^[A-Za-z0-9\s-]+$/; 
  const userstname = streetName.value;  
  if (stnamePattern.test(userstname)) {
    streetName.style.cssText = validStyle();
  } else {
    //streetName.setCustomValidity("Please enter Street name with no '#' symbol")
    streetName.style.cssText = invalidStyle();
  }
});

cityName.addEventListener("input", () => {
  const citynamePattern = /^[A-Za-z\s.'-]+$/; 
  const userctname = cityName.value;  
  if (citynamePattern.test(userctname)) {
    cityName.style.cssText = validStyle();
  } else {
    //cityName.setCustomValidity("Please enter Street name with no '#' symbol")
    cityName.style.cssText = invalidStyle();
  }
});

stateName.addEventListener("input", () => {
  const statenamePattern = /^[A-Za-z\s.'-]+$/;
  const userstatename = stateName.value;  
  if (statenamePattern.test(userstatename)) {
    stateName.style.cssText = validStyle();
  } else {
    //stateName.setCustomValidity("Please enter Street name with no '#' symbol")
    stateName.style.cssText = invalidStyle();
  }
});

zipCode.addEventListener("input", () => {
  const zipCodePattern = /^\d+$/;
  const userzipcode = zipCode.value;  
  if (zipCodePattern.test(userzipcode)) {
    zipCode.style.cssText = validStyle();
  } else {
    //zipCode.setCustomValidity("Only numbers")
    zipCode.style.cssText = invalidStyle();
  }
});

creditCardNumber.addEventListener("input", () => {
  const creditCardNumberPattern = /^\d{16}$/;
  const usercreditcard = creditCardNumber.value;  
  if (creditCardNumberPattern.test(usercreditcard)) {
    creditCardNumber.style.cssText = validStyle();
  } else {
    //creditCardNumber.setCustomValidity("Add 16 numbers")
    creditCardNumber.style.cssText = invalidStyle();
  }
});

expirationDate.addEventListener("input", () => {
  const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const userexpirationdate = expirationDate.value;  
  if (expirationDatePattern.test(userexpirationdate)) {
    expirationDate.style.cssText = validStyle();
  } else {
    //expirationDate.setCustomValidity("Add 16 numbers")
    expirationDate.style.cssText = invalidStyle();
  }
});

codeNumber.addEventListener("input", () => {
  const codeNumberPattern = /^\d{3}$/;
  const usercodenumber = codeNumber.value;  
  console.log(codeNumberPattern.test(usercodenumber)); 
  if (codeNumberPattern.test(usercodenumber)) {
    codeNumber.style.cssText = validStyle();
    codeNumber.setCustomValidity(""); 
  } else {
    console.log("here"); 
    codeNumber.setCustomValidity("Add 3 number. No letters")
    codeNumber.style.cssText = invalidStyle();
  }
});

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
