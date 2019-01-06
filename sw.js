// LEGACY CODE
// ------------------------------------
// self.addEventListener('fetch', function (event) {
//     console.log(event.request.url);
//     if (event.request.url.startsWith(location.origin) && (!location.pathname.includes('.'))) {
//         var r = caches.match(location.origin + '/index.html');
//         event.respondWith(r);
//     } else {
//         if (AppDat.includes("/" + event.request.url.split('/')[3]) || AppDat.includes("/lib/" + event.request.url.split('/')[4])) {
//             event.respondWith(caches.match(event.request.url));
//         } else {
//             console.log("Server Fetch: " + event.request.url);
//         }
//     }
// });


// State management

const vn = "version-x4";

// Files to cache
var appCash = [
    '/index.html',
    '/style.css',
    '/lib/skyroute.css',
    '/lib/skyroute.js',
    '/sw.js'
];

// Install & cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(vn).then((cache) => {
            return cache.addAll(appCash);
        })
    );
});

// Listen for mesg
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    } else if (event.data.action === 'clearOld') {
        event.waitUntil(
            caches.keys().then((keys) => Promise.all(
                keys.map((k) => {
                    if (!vn.includes(k)) {
                        return caches.delete(k);
                    }
                })
            )).then(() => {
                console.log('old caches are cleared now');
            })
        )
    }
});

// SkyRoute Intercepts
self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    if (url.origin === location.origin && (!url.pathname.includes("."))) {
        var r = caches.match(location.origin + '/index.html');
        e.respondWith(r);
    } else {
        (appCash.includes(url.pathname)) ? e.respondWith(caches.match(url)) : console.log("Server Fetch: " + url);
    }
});

