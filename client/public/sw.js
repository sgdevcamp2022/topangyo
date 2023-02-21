let notificationUrl ="http://localhost:3000";

self.addEventListener('push', function (event) {
    console.log('Push received: ', event);
    let _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = _data.url;
    event.waitUntil(
        self.registration.showNotification(_data.title, {
            body: _data.message,
            icon: '/ms-icon-150x150.png',
            tag: _data.tag
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }
        })
    );
});