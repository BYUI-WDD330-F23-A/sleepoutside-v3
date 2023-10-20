import { renderListWithTemplate, getLocalStorage} from "./utils.mjs";

function shoppingCartTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <select class="cart-card__quantity select" id="textboxes">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }

function checkoutTemplate(items) {
    let sumTotal = 0;
    items.forEach((value) => {
      sumTotal += parseFloat(value);
    });

  
    const totalPrice = `<div class="cart-footer-hide">
    <p class="cart-total">Total: $${sumTotal}</p>
    <button id="checkoutBtn">Checkout</button>
  </div>`;
    return totalPrice;
  }

export default function shoppingList(selector = "") {
  const itemListArea = document.getElementById(selector); 
  const products =  getLocalStorage("so-cart");  

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

addingTotalItem();

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



