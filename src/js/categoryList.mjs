import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";



function categoryCardTemplate(category) {
  return `<li>
            <a href="${category.url}">
              <img src="${category.imgSrc}" alt="${category.altTxt}">
              ${category.name}
            </a>
          </li>`;
}

export default async function categoryList(selector = "") {
  //TODO add something
  const itemListArea = document.getElementById(selector);
  const categories = await getData("categories");
  
  renderListWithTemplate(categoryCardTemplate, itemListArea, categories);
}

