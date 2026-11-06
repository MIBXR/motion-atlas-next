(() => {
  'use strict';
  const base = new URL('../../', document.currentScript.src);
  let registration;
  const ready = (!('serviceWorker' in navigator) || !window.isSecureContext)
    ? Promise.resolve(false)
    : navigator.serviceWorker.register(new URL('asset-cache-worker.js', base), {scope:base.pathname, updateViaCache:'none'})
      .then(async result => {
        registration = result;
        const active = await Promise.race([navigator.serviceWorker.ready,
          new Promise(resolve => setTimeout(() => resolve(null), 4000))]);
        if (!active) return false;
        if (navigator.serviceWorker.controller) return true;
        return new Promise(resolve => {
          const changed = () => { clearTimeout(timeout); resolve(true); };
          navigator.serviceWorker.addEventListener('controllerchange', changed, {once:true});
          const timeout = setTimeout(() => {
            navigator.serviceWorker.removeEventListener('controllerchange', changed);
            resolve(false);
          }, 4000);
        });
      }).catch(() => false);
  async function request(type) {
    if (!await ready) return {available:false, files:0, bytes:0};
    const worker = navigator.serviceWorker.controller || registration?.active;
    if (!worker) return {available:false, files:0, bytes:0};
    return new Promise(resolve => {
      const channel = new MessageChannel();
      const timeout = setTimeout(() => { channel.port1.close(); resolve({available:false}); }, 8000);
      channel.port1.onmessage = event => { clearTimeout(timeout); channel.port1.close(); resolve(event.data); };
      worker.postMessage({type}, [channel.port2]);
    });
  }
  window.AtlasAssetCache = Object.freeze({ready,
    status:() => request('atlas-cache-status'), clear:() => request('atlas-cache-clear'),
    remember:urls => ready.then(available => {
      if (available) navigator.serviceWorker.controller?.postMessage({type:'atlas-cache-remember', urls});
    })});
})();
