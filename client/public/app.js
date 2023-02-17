let isSubscribed = false;
let swRegistration = null;
let applicationKey =
  "BJAD-eUB3rWHkpWEpzJJgVbWFatglZ-GIJWkZFLP0BbElvYeVqJQ221hE7QF6WCxcsVX30-x8qM_GvyFpVb9n8E";
const connectURL = `http://localhost:3800/subscribe`;
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("Service Worker, Push working");
  navigator.serviceWorker
    .register("sw.js")
    .then(function (swReg) {
      console.log("service worker registered");
      swRegistration = swReg;
      swRegistration.pushManager
        .getSubscription()
        .then(function (subscription) {
          console.log(subscription);
          isSubscribed = !(subscription === null);
          if (isSubscribed) {
            console.log("User is subscribed");
          } else {
            swRegistration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(applicationKey),
              })
              .then(function (subscription) {
                console.log(subscription);
                console.log("User is subscribed");
                saveSubscription(subscription);
                isSubscribed = true;
              })
              .catch(function (err) {
                console.log("Failed to subscribe user: ", err);
              });
          }
        });
    })
    .catch(function (error) {
      console.error("Service Worker Error", error);
    });
} else {
  console.warn("Push messaging faild");
}

function saveSubscription(subscription) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", connectURL);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState != 4) return;
    if (xmlHttp.status != 200 && xmlHttp.status != 304) {
      console.log("HTTP error " + xmlHttp.status, null);
    } else {
      console.log("User subscribed to server");
    }
  };
  xmlHttp.send(JSON.stringify(subscription));
}
