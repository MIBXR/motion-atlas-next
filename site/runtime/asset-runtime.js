(() => {
  const root = new URL('../../', document.currentScript.src);
  const sources = globalThis.MotionAtlasAssetSources.assets;
  const resolve = (value, base = document.baseURI) => {
    const url = new URL(value, base);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return value;
    const asset = sources[decodeURIComponent(url.pathname.slice(root.pathname.length))];
    return asset ? asset.url + url.search + url.hash : value;
  };
  const css = value => value.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (all, quote, url) => `url("${resolve(url)}")`);
  const nativeFetch = globalThis.fetch.bind(globalThis);
  const fetchAsset = (input, options) => {
    const original = input instanceof Request ? input.url : String(input);
    const target = resolve(original);
    return nativeFetch(target === original ? input : input instanceof Request ? new Request(target, input) : target, options);
  };
  const info = (value, base = document.baseURI) => {
    const url = new URL(value, base);
    return sources[decodeURIComponent(url.pathname.slice(root.pathname.length))] || Object.values(sources).find(asset => asset.url === url.href);
  };
  globalThis.MotionAtlasAssets = Object.freeze({ resolve, fetch: fetchAsset, info });
  globalThis.fetch = fetchAsset;

  // Resolve before native setters start loading, including detached preload images.
  for (const [prototype, attribute] of [[HTMLImageElement.prototype, 'src'], [HTMLMediaElement.prototype, 'src'], [HTMLSourceElement.prototype, 'src'], [HTMLVideoElement.prototype, 'poster']]) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, attribute);
    Object.defineProperty(prototype, attribute, { ...descriptor, set(value) {
      const target = resolve(value);
      if (target !== value && this instanceof HTMLImageElement) this.crossOrigin = 'anonymous';
      descriptor.set.call(this, target);
    } });
  }
  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (/^(?:img|video|audio|source)$/i.test(this.localName) && /^(?:src|poster)$/i.test(name)) value = resolve(value);
    return nativeSetAttribute.call(this, name, value);
  };
  globalThis.FontFace = new Proxy(FontFace, { construct(Target, args, NewTarget) {
    if (typeof args[1] === 'string') args[1] = css(args[1]);
    return Reflect.construct(Target, args, NewTarget);
  } });
  const prepare = (scope, descendants = true) => {
    const elements = scope.nodeType === 1 ? [scope] : [];
    if (descendants && scope.querySelectorAll) elements.push(...scope.querySelectorAll('img,video,audio,source,[style]'));
    for (const element of elements) {
      for (const attribute of ['src', 'poster']) {
        if (!/^(?:img|video|audio|source)$/i.test(element.localName) || !element.hasAttribute(attribute)) continue;
        const value = element.getAttribute(attribute), target = resolve(value);
        if (value !== target) {
          if (element instanceof HTMLImageElement) element.crossOrigin = 'anonymous';
          element.setAttribute(attribute, target);
        }
      }
      const style = element.getAttribute('style');
      if (style?.includes('url(')) {
        const target = css(style);
        if (target !== style) element.setAttribute('style', target);
      }
    }
  };
  new MutationObserver(rows => {
    for (const row of rows) {
      if (row.type === 'attributes') prepare(row.target, false);
      else for (const node of row.addedNodes) if (node.nodeType === 1) prepare(node);
    }
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'poster', 'style'] });
  document.addEventListener('DOMContentLoaded', () => prepare(document), { once: true });
})();
