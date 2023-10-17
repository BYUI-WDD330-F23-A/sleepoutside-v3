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
    <p class="cart-card__quantity">qty: 1</p>
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
  //TODO add something 
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




