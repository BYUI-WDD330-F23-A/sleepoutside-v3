import { findProductById } from "./productData.mjs";

export default async function productDetails(productId) {
    
    const theProduct = await findProductById(productId);
    renderProductDetails(theProduct);
}

export function addProductToCart(product) {
    setLocalStorage("so-cart", product);
  }

function listColors(color) {
    return color.ColorName + "<br>";
}

function renderProductDetails(product) {
    console.log(product);

    const productName = document.getElementById('productName');
    const productNameWithoutBrand = document.getElementById('productNameWithoutBrand');
    const productImage = document.getElementById('productImage');
    const productFinalPrice = document.getElementById('productFinalPrice');
    const productColorName = document.getElementById('productColorName');
    const productDescriptionHtmlSimple = document.getElementById('productDescriptionHtmlSimple');

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

    // productColorName.innerHTML = product.Colors
    //     .forEach(listColors);

    // productColorName.innerHTML = product.Colors
    //     .forEach(
    //         (aColor) => {
    //             console.log(aColor);
    //             return aColor.ColorName + "<br>";
    //         }
    //     );
    
    productDescriptionHtmlSimple.innerHTML = product.DescriptionHtmlSimple;



    return product;
}