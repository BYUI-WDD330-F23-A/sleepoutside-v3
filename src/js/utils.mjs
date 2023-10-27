// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let item = localStorage.getItem(key);//get the item that is added to the cart. 
  let soCart = JSON.parse(item); // parses string and returns a JavaScript object.
  if (soCart == null) {
    soCart = [];
  }
  soCart.push(data); //add the data fro the item to the array. 
  localStorage.setItem(key, JSON.stringify(soCart));//storage that array in a string. 
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);

  return value;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  //clear
  if (clear) {
    parentElement.innerHTML = ""; 
  }
  const htmlStrings = list.map(templateFn); 
  parentElement.insertAdjacentHTML(position, htmlStrings.join("")); //join() array returns a new string concatenating. 
}


export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}


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

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
    const html = await res.text();
    return html;
    }
};
}

export function loadHeaderFooter() {

  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer"); 
  
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);  
  //itemCountCart();
}

export async function itemCountCart(){
  let numItems = getLocalStorage("so-cart"); 
  console.log(numItems); 
  if (numItems == null) {
      numItems = [];
  } 
  console.log(numItems); 
  await fetch (document.getElementById("itemCount"))
    .then(res => {
      if (res.ok){
        const items = document.getElementById("itemCount"); 
        console.log(items); 
        if (numItems.length > 0) {
          items.style.display = `flex`; 
          items.innerHTML = `${numItems.length}`;
         } else {
            console.debug("The cart is Empty"); 
         } 
      }
    })    
} 
