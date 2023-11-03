import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function shoppingCartTemplate(item) {
  const theSelectedColor = item.selectedColor || 0;
  const quantityNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const quantityListArray = quantityNumbers.map( 
    (value) => {
      let isSelected = item.quantity == value ? 'selected="true"' : '';
      return `<option value="${value}" ${isSelected}>${value}</option>`;
    });
  const quantityList = quantityListArray.join("\n");
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">
      <img src="${item.Colors[theSelectedColor].ColorChipImageSrc}" alt="${item.Colors[theSelectedColor].ColorName}">  
      ${item.Colors[theSelectedColor].ColorName}
    </p>
    <select class="cart-card__quantity select" id="textboxes">` +
    quantityList +
    `</select>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button type="button" id= "removeItem">X</button>
  </li>`;

  return newItem;
}

function remElement(element){
  const elem = document.getElementById(element); 
  return elem
}
async function removeItems() {
  let numItems = getLocalStorage("so-cart"); 
  // console.log(numItems); 
  if (numItems == null) {
      numItems = [];
  } 
  await fetch (document.getElementById("removeItem"))
  .then(res => {
    if (res.ok) {
      /* const btnRemove = document.getElementById("removeItem"); 
      btnRemove.addEventListener("click", console.log("remove")) */
      const elem = document.getElementById("removeItem"); 
      console.log(elem);
    } 
    });
} 

function checkoutTemplate(items) {
  let sumTotal = 0;
  items.forEach((value) => {
    sumTotal += parseFloat(value);
  });

  const totalPrice = `<div class="cart-footer-hide">
    <p class="cart-total">Total: $${sumTotal}</p>
    <a href="/checkout/" id="checkoutLink"><button id="checkoutBtn">Checkout</button></a>
  </div>`;
  return totalPrice;
}

export default function shoppingList(selector = "") {
  const itemListArea = document.getElementById(selector);
  const products = getLocalStorage("so-cart");

  // cartItems will now never be NULL. More appropriate to check for empty array.
  if (products.length > 0) {
    let totalItems = products.map(function (item) {
      let total = [];
      total.push(item.FinalPrice);
      return total;
    });
    document.querySelector(".checkout-area").innerHTML =
      checkoutTemplate(totalItems);
  }

  renderListWithTemplate(shoppingCartTemplate, itemListArea, products);
  addingTotalItem();
}

export function iconAnimation() {
  const iconCart = document.getElementById("cart-icon");

  iconCart.style.width = `35px`;
  iconCart.style.fill = `#525b0f`;

  setTimeout(() => {
    iconCart.style.width = `25px`;
    iconCart.style.fill = `#303030`;
  }, 2000);
}

function addingTotalItem() {
  // Selecting how many items had been chose from the dropdown.
  const sel = document.querySelectorAll(".cart-card__quantity");
  const cartItems = getLocalStorage("so-cart") || [];
  sel.forEach((e, i) => {
    e.addEventListener("change", (event) => {
      cartItems[i].count = e.value;
      let totalItems = cartItems.map(function (item) {
        let total = [];
        let count = item.count ? item.count : 1;
        total.push(item.FinalPrice * count);
        return total;
      });
      document.querySelector(".checkout-area").innerHTML =
        checkoutTemplate(totalItems);
    });
  });
}
