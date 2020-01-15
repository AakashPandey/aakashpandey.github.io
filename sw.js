console.log("[SKYROUTES-BETA-0.5] An innovative client side router by Aakash Pandey");
const vn = "legacyl7";
const chg = "change time";

var appCash = [
    '/index.html',
    '/lib/skyroute.css',
    '/lib/skyroute.js',
    '/assets/back2.jpg',
    '/assets/a.png',
    '/style/style.css',
    '/script/main.js',
    '/style/fa/fonts/fontawesome-webfont.woff2?v=4.7.0',
    'https://fonts.gstatic.com/s/thasadith/v3/mtG44_1TIqPYrd_f5R1ot0MV.woff2',
    'https://fonts.gstatic.com/s/abel/v10/MwQ5bhbm2POE2V9BPQ.woff2',
    'https://fonts.googleapis.com/css?family=Abel|Thasadith|Roboto'

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
    if (url.origin === location.origin && (!url.pathname.includes(".")) && (!/howdy|dissolve|uijs|skynotes|leafapp|skyroutes|greetings|MME|sjson|avm|embedmedium/.test(url.pathname)) ) {
        var r = caches.match(location.origin + '/index.html');
        e.respondWith(r);
    } else {
        (appCash.includes(url.pathname)) ? e.respondWith(caches.match(url)) : console.log("Server Fetch: " + url);
    }
});

