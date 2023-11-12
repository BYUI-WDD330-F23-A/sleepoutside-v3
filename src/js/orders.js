import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";

let userToken = checkLogin();

function orderListTemplate(order) {
  const itemList = order.items.map(
    (value) =>
      `<tr><td>${value.id}</td><td>${value.name}</td><td>${value.quantity}</td></tr>`
  );
  const itemListHTML = itemList.join("\n");
  const newOrder = `
        <h3>${order.lname}, ${order.fname}</h3>
        <p>${order.orderDate}</p>
        <h4>Address:</h4>
        <p>${order.street}<br/>
        ${order.city}, ${order.state} ${order.zip}</p>
        <h4>Total Charged: $${order.orderTotal}</h4>
        <h4>Items Ordered:</h4>
        <table class="order-table" cellspacing="0">
        <tr><th>ID</th><th>Name</th><th>Qty.</th></tr>
        ${itemListHTML}
        </table>
        <hr>
    `;
  return newOrder;
}

async function orderList(selector = "") {
  const itemListArea = document.getElementById(selector);
  const orders = await getOrders(userToken);
  renderListWithTemplate(orderListTemplate, itemListArea, orders);
}

loadHeaderFooter();
orderList("order-list");
