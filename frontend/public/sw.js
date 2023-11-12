import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { clientsClaim } from 'workbox-core';
import { BackgroundSyncPlugin, Queue } from 'workbox-background-sync';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'documents',
  }),
);
registerRoute(
  ({ url, request }) => url.pathname.startsWith('/api/') && request.method === 'GET',
  new NetworkFirst({
    cacheName: 'api',
  }),
);
registerRoute(
  ({ request }) => request.destination === 'image' && !request.url.includes('files'),
  new CacheFirst({
    cacheName: 'images',
  }),
);
registerRoute(
  ({ url }) => url.pathname.startsWith('/files/'),
  new StaleWhileRevalidate({
    cacheName: 'external-files',
  }),
);

registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'external',
  }),
);

const queue = new Queue('requestsQueue');
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' || event.request.method === 'OPTIONS') {
    return;
  }

  const bgSyncLogic = async () => {
    try {
      const response = await fetch(event.request.clone());
      return response;
    } catch (error) {
      await queue.pushRequest({ request: event.request });
      return error;
    }
  };

  event.respondWith(bgSyncLogic());
});

self.skipWaiting();
clientsClaim();
