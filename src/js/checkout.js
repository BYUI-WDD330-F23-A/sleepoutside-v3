import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .getElementById("zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);
});

/* Validation */
function validStyle() {
  return `border: 3px solid green; background: linear-gradient(to right, rgba(126, 181, 178, 0.5), rgba(71, 199, 175, 0.5), rgba(0, 214, 152, 0.5), rgba(11, 226, 108, 0.5), rgba(88, 235, 18, 0.5));`;
}

function invalidStyle() {
  return `border: 3px dashed red;`;
}

const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const streetName = document.getElementById("street");
const cityName = document.getElementById("city");
const stateName = document.getElementById("state");
const zipCode = document.getElementById("zip");
const creditCardNumber = document.getElementById("cardNumber");
const expirationDate = document.getElementById("expiration");
const codeNumber = document.getElementById("code");

firstName.addEventListener("input", () => {
  const fnamePattern = /^[A-Za-z]+$/;
  const userfname = firstName.value;
  if (fnamePattern.test(userfname)) {
    firstName.style.cssText = validStyle();
    firstName.setCustomValidity("");
  } else {
    firstName.setCustomValidity("Please enter only Letters");
    firstName.style.cssText = invalidStyle();
  }
});

lastName.addEventListener("input", () => {
  const lnamePattern = /^[A-Za-z]+$/;
  const userlname = lastName.value;
  if (lnamePattern.test(userlname)) {
    lastName.style.cssText = validStyle();
    streetName.setCustomValidity("");
  } else {
    lastName.setCustomValidity("Please enter only Letters");
    lastName.style.cssText = invalidStyle();
  }
});

streetName.addEventListener("input", () => {
  const stnamePattern = /^[A-Za-z0-9\s-]+$/;
  const userstname = streetName.value;
  if (stnamePattern.test(userstname)) {
    streetName.style.cssText = validStyle();
    streetName.setCustomValidity("");
  } else {
    streetName.setCustomValidity("Please enter Street name with no '#' symbol");
    streetName.style.cssText = invalidStyle();
  }
});

cityName.addEventListener("input", () => {
  const citynamePattern = /^[A-Za-z\s.'-]+$/;
  const userctname = cityName.value;
  if (citynamePattern.test(userctname)) {
    cityName.style.cssText = validStyle();
    cityName.setCustomValidity("");
  } else {
    cityName.setCustomValidity("Please enter Street name with no '#' symbol");
    cityName.style.cssText = invalidStyle();
  }
});

stateName.addEventListener("input", () => {
  const statenamePattern = /^[A-Za-z\s.'-]+$/;
  const userstatename = stateName.value;
  if (statenamePattern.test(userstatename)) {
    stateName.style.cssText = validStyle();
    stateName.setCustomValidity("");
  } else {
    stateName.setCustomValidity("Please enter Street name with no '#' symbol");
    stateName.style.cssText = invalidStyle();
  }
});

zipCode.addEventListener("input", () => {
  const zipCodePattern = /^\d+$/;
  const userzipcode = zipCode.value;
  if (zipCodePattern.test(userzipcode)) {
    zipCode.style.cssText = validStyle();
    zipCode.setCustomValidity("");
  } else {
    zipCode.setCustomValidity("Only numbers");
    zipCode.style.cssText = invalidStyle();
  }
});

creditCardNumber.addEventListener("input", () => {
  const creditCardNumberPattern = /^\d{16}$/;
  const usercreditcard = creditCardNumber.value;
  if (creditCardNumberPattern.test(usercreditcard)) {
    creditCardNumber.style.cssText = validStyle();
    creditCardNumber.setCustomValidity("");
  } else {
    creditCardNumber.setCustomValidity("Add 16 numbers");
    creditCardNumber.style.cssText = invalidStyle();
  }
});

expirationDate.addEventListener("input", () => {
  const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const userexpirationdate = expirationDate.value;
  if (expirationDatePattern.test(userexpirationdate)) {
    expirationDate.style.cssText = validStyle();
    expirationDate.setCustomValidity("");
  } else {
    expirationDate.setCustomValidity("Add expiration date in the format MM/YY");
    expirationDate.style.cssText = invalidStyle();
  }
});

codeNumber.addEventListener("input", () => {
  const codeNumberPattern = /^\d{3}$/;
  const usercodenumber = codeNumber.value;
  if (codeNumberPattern.test(usercodenumber)) {
    codeNumber.style.cssText = validStyle();
    codeNumber.setCustomValidity("");
  } else {
    codeNumber.setCustomValidity("Add 3 numbers. No letters");
    codeNumber.style.cssText = invalidStyle();
  }
});
