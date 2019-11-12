console.log("[SKYROUTES-BETA-0.5] An innovative client side router by Aakash Pandey");
const vn = "legacyl2";
const chg = "sync";

var appCash = [
    '/index.html',
    '/lib/skyroute.css',
    '/lib/skyroute.js',
    '/assets/back2.jpg',
    '/assets/a.png',
    '/style/style.css',
    '/script/main.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(vn).then((cache) => {
            return cache.addAll(appCash);
        })
    );
});


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


self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    if (url.origin === location.origin && (!url.pathname.includes(".")) && (!/howdy|dissolve|uijs|skynotes|leafapp|skyroutes|greetings|MME/.test(url.pathname)) ) {
        var r = caches.match(location.origin + '/index.html');
        e.respondWith(r);
    } else {
        (appCash.includes(url.pathname)) ? e.respondWith(caches.match(url)) : console.log("Server Fetch: " + url);
    }
});

