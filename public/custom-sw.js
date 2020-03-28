self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('New notification', data);
  const { title, text, ...rest } = data;
  const options = {
    body: text,
    ...rest
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log(event.action);
  console.log(event);
  event.notification.close();

  switch (event.action) {
    case 'google':
      event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
          if (clients.openWindow) {
            return clients.openWindow('http://www.google.com');
          }
        })
      );
      break;
    case 'facebook':
      event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
          if (clients.openWindow) {
            return clients.openWindow('http://www.facebook.com');
          }
        })
      );
      break;
    case 'apple':
      event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
          if (clients.openWindow) {
            return clients.openWindow('http://www.apple.com');
          }
        })
      );
      break;

    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});

self.notificationActions = {
  google: function(customData) {
    return window.open('http://www.google.com', '_blank');
  },

  facebook: function(customData) {
    return window.open('http://www.facebook.com', '_blank');
  },
  apple: function(customData) {
    return window.open('http://www.apple.com', '_blank');
  }
};
