import { convertToJson } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";


async function getJsonFile(name) {
  return fetch(`../json/${name}.json`)
  .then(convertToJson)
  .then((data) => data);
}


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
  const categories = await getJsonFile("categories");
  
  renderListWithTemplate(categoryCardTemplate, itemListArea, categories);
}

