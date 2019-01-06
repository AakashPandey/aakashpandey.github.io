// State management

navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});



var halt = () => {
  document.body.innerHTML = `<div id="ee">Dev</div>`;
  document.getElementById('ee').style.display = "block";
}

// sw ref
var swork;

// SW Reg
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function (reg) {
     if(swork = reg.waiting) {
        upsw();
      }
      reg.addEventListener('updatefound', () => {
        // Copy reference of new worker being installed
        swork = reg.installing;
        swork.addEventListener('statechange', () => {
          // Has service worker state changed and it's not the first call since n.s.c is not defined then
          if (swork.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New state found');
            upsw();
          }
        })
      })  // updatefound

    }).catch(function (error) {

    });
} else {
  halt();
}

var upsw = () => {
  swork.postMessage({ action: 'clearOld' });
  swork.postMessage({ action: 'skipWaiting' });
  console.log('fired the update');
}


// Utils


// Error pg
var ei = () => {
  e4 = `<div id="e" class="pg"><br><i>Error 404 Page Not Found</i><br><br><a href="https://github.com/aakashpandey">SkyRoute</a></div>`;
  document.body.innerHTML += e4;
}


// Toggle pg
var ui = (el) => {
  el = document.getElementById(el);
  if (el.classList.contains('pgi')) {
    el.classList.toggle('pgi');
    el.classList.toggle('vis');
    return;
  }
  el.classList.toggle('pg');
  el.classList.toggle('vis');

}

// Hide all pgs
var iu = () => {
  e = document.querySelectorAll(".vis");
  for (i = 0; i < e.length; i++) {
    e[i].classList.remove('vis');
    e[i].classList.add('pg');
  }
}

// ---------------- End Utils

// Globals
var Routes;

// Scan and save paths
var ipp = () => {
  var Path = {};
  e = document.querySelectorAll(".pgi");
  Path[""] = e[0].id;
  e = document.querySelectorAll(".pg");
  for (i = 0; i < e.length; i++) {
    Path[e[i].id] = e[i].id;
  }
  localStorage.Path = JSON.stringify(Path);
}

// Handlers

var run = () => {
  ei();
  ipp();
  Routes = JSON.parse(localStorage.Path);
  nav();
}


// Actions

var nav = (p) => {
  // If URI Load
  if (!p && p !== "") {
    pg = Routes[location.pathname.slice(1)];
  } else {
    pg = Routes[p];
    if (p !== "") {
      history.pushState({ path: pg }, "SkyRoute", `/${pg}`);
    } else {
      history.pushState({ path: pg }, "SkyRoute", `/`);
    }
  }
  iu();
  if (!pg) {
    ui("e");
  } else {
    ui(pg);
  }
  pathEvents(location.pathname.slice(1));
}

// On load
document.addEventListener('DOMContentLoaded', () => {
  run();
  window.addEventListener('popstate', () => {
    nav();
  })
}, false);



