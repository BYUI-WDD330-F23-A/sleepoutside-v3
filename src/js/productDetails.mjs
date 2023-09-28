import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let theProduct = {};

export default async function productDetails(productId) {
    
    theProduct = await findProductById(productId);
    renderProductDetails(theProduct);

    // Add the event listener now that the page is rendered.
    document.getElementById("addToCart").addEventListener('click', addProductToCart);
}

export function addProductToCart() {
    setLocalStorage("so-cart", theProduct);
  }

function renderProductDetails(product) {

    const productName = document.getElementById('productName');
    const productNameWithoutBrand = document.getElementById('productNameWithoutBrand');
    const productImage = document.getElementById('productImage');
    const productFinalPrice = document.getElementById('productFinalPrice');
    const productColorName = document.getElementById('productColorName');
    const productDescriptionHtmlSimple = document.getElementById('productDescriptionHtmlSimple');
    const addToCartButton = document.getElementById('addToCart');

    productName.innerHTML = product.Name;
    productNameWithoutBrand.innerHTML = product.NameWithoutBrand;
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
    productFinalPrice.innerHTML = product.FinalPrice;

    const colorList = product.Colors.map(
        (aColor) => aColor.ColorName
    );
    
    let colorListHtml = colorList.join('<br>');
    productColorName.innerHTML = colorListHtml;
    
    productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;

    addToCartButton.dataset.id = product.Id;

    return product;
}