// Wrapper for querySelector... Returns matching element.
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from Localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function clearLocalStorage(key){
  localStorage.setItem(key, JSON.stringify([]));
  return true; 
}

// Save data to local storage
export function setLocalStorage(key, data) {
  let item = localStorage.getItem(key); // Get the items that are currently in the cart. 
  let soCart = JSON.parse(item);        // Parses string and returns a JavaScript object.
  if (soCart == null) {
    // If there's nothing in the cart, make sure we start with an empty array
    // so we can have all the Array methods. 
    soCart = [];
  }
  // Not possible to have a negative index, 
  // so this will act as a flag for no match or
  // an empty cart.
  let matched_index = -1; 
  
  if (soCart.length > 0) {
    soCart.forEach(
      (item, i) => {
        // Match both model number and color option.
        if (
          item.Id == data.Id && 
          item.selectedColor == data.selectedColor
        ) {
          // Found a match, let's record where we found it.
          matched_index = i;
        }
      });
  }

  if (matched_index > -1) {
    // Increase the quantity of the item already in the cart.
    soCart[matched_index].quantity++;
  } else {
    // Otherwise, push the new item on the list.
    soCart.push(data); 
  }
  // Replace entire localStorage with modified array.
  localStorage.setItem(key, JSON.stringify(soCart));
}




// Set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get a parameter that is in the URL and return the argument value. (Key=value).
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}


// Render a list of items using a specific template function.
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = ""; 
  }
  const htmlStrings = list.map(templateFn); 
  parentElement.insertAdjacentHTML(position, htmlStrings.join("")); //join() array returns a new string concatenating. 
}


// Convert an HTTP response to JSON.
export function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse}; 
  }
}

// Render a single data object with a template function.
export function renderWithTemplate(templateFn, parentElement, data, callback = null, position = "afterbegin", clear = true) {
  //clear
  if (clear) {
    parentElement.innerHTML = ""; 
  }
   const htmlStrings = templateFn()
        .then(
          (Result) => {
              parentElement.insertAdjacentHTML(position, Result); 
          }); 


  if (callback) {
    callback(data);
  }
}


// Load an external template file.
function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
    const html = await res.text();
    return html;
    }
};
}


// Load the header and footer templates.
export function loadHeaderFooter() {

  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer"); 
  
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);  
}


// Calculate number of items in the cart and display a 
// count bubble on the shopping cart icon.
export async function itemCountCart(){
  let numItems = getLocalStorage("so-cart"); 
  // console.log(numItems); 
  if (numItems == null) {
      numItems = [];
  } 
  await fetch (document.getElementById("itemCount"))
    .then(res => {
      if (res.ok) {
        const items = document.getElementById("itemCount"); 
        if (numItems.length > 0) {
          // Loop through the items in cart and add up their quantities.
          let totalQuantity = numItems.reduce(
            (a, x) => {
              return(a + x.quantity);
            }, 0
          );
          console.log(totalQuantity);
          items.style.display = `flex`; 
          items.innerHTML = `${totalQuantity}`;
         } else {
            console.debug("The cart is Empty"); 
         } 
      }
    });    
} 
