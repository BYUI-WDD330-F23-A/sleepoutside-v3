import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p></a>
          </li>`; 
}

export default async function productList(selector = "", category = "") {
  //TODO add something 
  const itemListArea = document.getElementById(selector); 
  const products = await getData(category);  
  const inactiveProducts = ["989CG", "880RT"]; 
  let productsTemp = products.filter(function (item) {
    
    return inactiveProducts.indexOf(item.Id) === -1; 
  }); 

  renderListWithTemplate(productCardTemplate, itemListArea, productsTemp); 

}