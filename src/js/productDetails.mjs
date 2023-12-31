import { findProductById, determineDiscount } from "./externalServices.mjs";
import { itemCountCart, setLocalStorage } from "./utils.mjs";
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
    document
      .getElementById("addToCart")
      .addEventListener("click", itemCountCart);
  } else {
    renderNotFound();
  }
}


export function addProductToCart() {
  // This won't add multiple items when hitting the add to cart button.
  // Future expansion, we could select the quanitity at the time we add to cart.
  // let selectedQuantity = document.getElementById("productQuantity").value
  let selectedQuantity = 1; // Hopefully this to be replaced by the line above someday.
  
  theProduct.quantity = selectedQuantity;
  theProduct.selectedColor = parseInt(
    document.getElementById("productSelectColor").value
  );
  setLocalStorage("so-cart", theProduct);
  // setLocalStorage will figure out if we are adding a duplicate item.
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

  productFinalPrice.innerHTML = `Price: ${determineDiscount(product)}`;

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    let discountPercent = Math.round((1 - (product.FinalPrice / product.SuggestedRetailPrice)) * 100);
    // Strangely, in some scopes we can address elements with IDs directly without loading variables.
    productBannerText.innerHTML=`${discountPercent}% off!`;
    productBannerText.style="display: block";
  }

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
  const productDescriptionHtmlSimple = document.getElementById(
    "productDescriptionHtmlSimple"
  );
  const buttonContainer = document.getElementById("buttonContainer");
  const colorsAvailableList = document.getElementById("colorsAvailableList");
  const selectedColorArea = document.getElementById("selectedColorArea");

  productName.innerHTML = "We've searched all over, but...";
  productNameWithoutBrand.innerHTML = "... We can't find that. &#128546;";
  productImage.src = "../images/crossroads.jpg";
  productImage.alt = "A crossroads sign.";
  productFinalPrice.innerHTML = "";

  colorsAvailableList.innerHTML = "";
  selectedColorArea.innerHTML = "";

  productDescriptionHtmlSimple.innerHTML = 
  `We are very sorry, but it appears the product you have requested is not available. 
  If the manufacturer has not discontinued the product, please check back at a later 
  date to see if we have restocked this item.`

  buttonContainer.innerHTML = "";

  return false;
}
