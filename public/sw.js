if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>n(e,o),d={module:{uri:o},exports:t,require:l};i[o]=Promise.all(s.map((e=>d[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-623ac6d6.css",revision:null},{url:"assets/index-6b1b2724.js",revision:null},{url:"assets/workbox-window.prod.es5-c46a1faa.js",revision:null},{url:"index.html",revision:"a206a459774f9ab5e9b136e29f9344e9"},{url:"imagenes/gym-icon-32.png",revision:"64d4872605d837af5277adfdb28b5ad8"},{url:"imagenes/gym-icon-96.png",revision:"23b253219bc895212af3829fe09c5d53"},{url:"imagenes/gym-icon-144.png",revision:"74a6b87fa3e32dfcb91b08ad699309e2"},{url:"manifest.webmanifest",revision:"469c6202daa5480ba58feefa2e29ff30"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
