import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

/**
 * TODO: Load the header and footer onto the page. DONE
 * TODO: Check for a url parameter called redirect (remember the utility function: getParam?) DONE
 * TODO: Add an event listener to our login form's button, when the login button is clicked do the following:
 * Get the username and password out of the form fields.
 * Pass those to the login function along with the redirect information we gathered above.
 **/

loadHeaderFooter();
// https://domain.com/login?redirect=https://domain.com/orders/
const redirect = getParam("redirect");

const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", () => {
  const credentials = {
    email: document.querySelector("#username-input").value,
    password: document.querySelector("#password-input").value,
  };

  login(credentials, redirect); //waiting to create this function.
});
