import { convertToJson, renderListWithTemplate } from './utils.mjs';

function getAlertData() {
    return fetch(`../json/alerts.json`)
      .then(convertToJson)
      .then((data) => data);
  }

function alertTemplate(theAlert) {
    return `<p class="alerts" style="color: ${theAlert.color}; background-color: ${theAlert.background}">${theAlert.message}</p>`;
}


export async function pageAlert() { 
    let alertList = await getAlertData()
        .then( (data) => data ) || [];
    
    if (alertList.length < 1) {
        // Nothing to do, just exit.
        return false;
    }

    document
        .getElementById('main')
        .insertAdjacentHTML("beforebegin", '<section id="alertBox" class="alert-list"></section>');
    
    let alertBox = document.getElementById('alertBox');

    renderListWithTemplate(alertTemplate, alertBox, alertList, "afterbegin");
}
