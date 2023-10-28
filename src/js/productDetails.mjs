import { findProductById } from "./productData.mjs";
import { itemCountCart, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { iconAnimation } from "./shoppingCart.mjs";

let theProduct = {};

export default async function productDetails(productId) {
  theProduct = (await findProductById(productId)) || false;

  if (theProduct) {
    renderProductDetails(theProduct);

    // Add the event listener now that the page is rendered.
    document
      .getElementById("addToCart")
      .addEventListener("click", addProductToCart);
    document
      .getElementById("addToCart")
      .addEventListener("click", iconAnimation);
  } else {
    renderNotFound();
  }
}


export function addProductToCart() {
  // this won't add multiple items when hitting the add to cart button.
  let cart_items;
  let matched_index;
  cart_items = getLocalStorage("so-cart");
  if (cart_items != null) {
    cart_items.forEach((item, i) => {
      if (item.Id == theProduct.Id) {
        matched_index = i;
      }
    });
  }
  if (matched_index != undefined) {
  } else {
    setLocalStorage("so-cart", theProduct);
  }
}


function renderProductDetails(product) {
  const productName = document.getElementById("productName");
  const productNameWithoutBrand = document.getElementById(
    "productNameWithoutBrand"
  );
  const productImage = document.getElementById("productImage");
  const productFinalPrice = document.getElementById("productFinalPrice");
  const productColorName = document.getElementById("productColorName");
  const productDescriptionHtmlSimple = document.getElementById(
    "productDescriptionHtmlSimple"
  );
  const addToCartButton = document.getElementById("addToCart");
  const productSelectColor = document.getElementById("productSelectColor");

  productName.innerHTML = product.Name;
  productNameWithoutBrand.innerHTML = product.NameWithoutBrand;
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;
  productFinalPrice.innerHTML = "$" + product.FinalPrice;

  const colorList = product.Colors.map(
    (aColor) =>
      `<li>
            <div>
                <img src="${aColor.ColorChipImageSrc}" alt="${aColor.ColorName}">
            </div>
            <div>
                ${aColor.ColorName}
            </div>
        </li>`
  );

  theProduct.selectedColor = theProduct.selectedColor || 0;
  const colorSelectList = product.Colors.map((bColor, index) => {
    let isSelected =
      theProduct.selectedColor === index ? "selected='true'" : "";
    return `<option value="${index}" ${isSelected}>
                ${bColor.ColorName}
            </option>`;
  });

  let colorListHtml = colorList.join("\n");
  productColorName.innerHTML = colorListHtml;

  let colorSelectListHtml = colorSelectList.join("\n");
  productSelectColor.innerHTML = colorSelectListHtml;

  productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;

  addToCartButton.dataset.id = product.Id;

  return product;
}


function renderNotFound() {

  const productName = document.getElementById("productName");
  const productNameWithoutBrand = document.getElementById(
    "productNameWithoutBrand"
  );
  const productImage = document.getElementById("productImage");
  const productFinalPrice = document.getElementById("productFinalPrice");
  const productColorName = document.getElementById("productColorName");
  const productDescriptionHtmlSimple = document.getElementById(
    "productDescriptionHtmlSimple"
  );
  const buttonContainer = document.getElementById("buttonContainer");

  productName.innerHTML = "We've searched all over, but...";
  productNameWithoutBrand.innerHTML = "... We can't find that. &#128546;";
  productImage.src = "../images/crossroads.jpg";
  productImage.alt = "A crossroads sign.";
  productFinalPrice.innerHTML = "";

  productColorName.innerHTML = "";

  productDescriptionHtmlSimple.innerHTML = `We are very sorry, but it appears the product you have requested is not available. If the manufacturer has not discontinued the product,
  please check back at a later date to see if we have restocked this item.`

  buttonContainer.innerHTML = "";

  return false;
}
