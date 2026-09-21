const VERSION='girok-v5-0-1';
const LOCAL=['./','./index.html','./loader.js?v=5.0.1','./app.js?v=5.0.1','./polish.css?v=5.0.1','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const PUBLIC=[
'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css',
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.1/dist/umd/supabase.js'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(VERSION);await cache.addAll(LOCAL);await Promise.allSettled(PUBLIC.map(async url=>{const r=await fetch(url,{mode:'cors'});if(r.ok)await cache.put(url,r);}));})()));
// Do not replace a running editor with a new version. The next full open activates it.
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('girok-v5-')&&name!==VERSION)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);if(req.method!=='GET')return;
 const isLocal=url.origin===self.location.origin&&url.href.startsWith(self.registration.scope);
 if(!isLocal&&!PUBLIC.includes(url.href))return; // never cache Supabase, auth or private records
 event.respondWith((async()=>{const cache=await caches.open(VERSION);const hit=await cache.match(req);if(hit)return hit;try{const res=await fetch(req);if(res.ok)await cache.put(req,res.clone());return res;}catch(e){if(req.mode==='navigate')return await cache.match('./index.html');throw e;}})());
});
