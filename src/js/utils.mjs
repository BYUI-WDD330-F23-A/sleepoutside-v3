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