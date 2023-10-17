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

async function handleErrorScr(product) {
  return await fetch(product.Image).then((response) => {
    console.debug(response);
    if (response.status === 404) {
      return false;
    } else {
      return true;
    }
  });
}

async function filterProductsWithoutImage(products) {
  // convert the list of products to a list of true and false based on if image exists
  const filteredResults = await Promise.all(products.map(handleErrorScr));
  // result will be something like [true, false, true, false, ...]

  console.debug(filteredResults);

  // filter out products based on the value in filteredResults
  // e.g. if product1 => true, keep, but if product2 => false, drop
  return products.filter((_, index) => filteredResults[index]);
}

export default async function productList(selector = "", category = "") {
  //TODO add something
  const itemListArea = document.getElementById(selector);
  const products = await getData(category);
  console.debug(products);
  const filteredProducts = await filterProductsWithoutImage(products);
  console.debug(filteredProducts);

  renderListWithTemplate(productCardTemplate, itemListArea, filteredProducts);
}

