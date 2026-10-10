const V="skins-pbr-v2",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"],EXT=["https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})));for(const u of EXT){try{await c.put(u,await fetch(u,{mode:"no-cors"}))}catch(_){}}self.skipWaiting()})())});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
// Mesmo domínio: tenta a rede primeiro (site atualizado aparece sozinho); sem internet, usa a cópia salva.
// Biblioteca externa (3D): usa a cópia salva e só baixa se ainda não tiver.
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const same=new URL(r.url).origin===location.origin;e.respondWith((async()=>{const c=await caches.open(V);
if(same){try{const n=await fetch(r,{cache:"no-cache"});if(n.ok)c.put(r,n.clone());return n}catch(err){const h=(await c.match(r,{ignoreSearch:true}))||(r.mode==="navigate"&&await c.match("index.html"));if(h)return h;throw err}}
const h=await c.match(r);if(h)return h;const n=await fetch(r);if(n&&(n.ok||n.type==="opaque"))c.put(r,n.clone());return n})())});
