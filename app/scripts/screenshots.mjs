import { chromium } from "playwright-core";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const edgePath = process.env.EDGE_PATH ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "screenshots");
const viewports = [
  { suffix: "desktop", width: 1440, height: 900 },
  { suffix: "mobile", width: 390, height: 844 }
];

const sites = [
  {
    name: "web",
    base: process.env.WEB_URL ?? "http://localhost:5221",
    shots: [
      { name: "home", route: "/", ready: ".homePage" },
      { name: "browse", route: "/browse?type=cases", ready: ".browsePage" },
      { name: "case", route: "/cases/apple-product", ready: ".casePage" },
      { name: "pattern", route: "/patterns/accent-role-tiers", ready: ".patternPage" },
      { name: "material", route: "/materials/0010-vigil", ready: ".materialPage" },
      { name: "docs", route: "/docs?path=docs%2Foverview.md", ready: ".docReaderHeader h1" }
    ]
  },
  {
    name: "motion",
    base: process.env.MOTION_URL ?? "http://localhost:5222",
    shots: [
      { name: "home", route: "/", ready: ".homePage" },
      { name: "browse", route: "/browse?type=cases", ready: ".browsePage" },
      { name: "case", route: "/cases/butterfly-garden-score", ready: ".casePage" },
      { name: "pattern", route: "/patterns/alert-reroute", ready: ".patternPage" },
      { name: "material", route: "/materials/hyperframes-registry", ready: ".materialPage" },
      { name: "docs", route: "/docs?path=docs%2Fpipeline.md", ready: ".docReaderHeader h1" }
    ]
  }
];

async function settlePage(page, ready) {
  await page.waitForSelector(".appShell", { state: "visible", timeout: 20000 });
  if (ready) {
    await page.waitForSelector(ready, { state: "visible", timeout: 30000 }).catch(() => undefined);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.images].filter((image) => image.getBoundingClientRect().top < window.innerHeight * 1.5);
    await Promise.race([new Promise((resolve) => setTimeout(resolve, 8000)), Promise.all(images.map((image) => (image.complete ? undefined : new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    }))))]);
    window.scrollTo(0, 0);
  });
  for (const loader of [".playerLoading", ".demoLoading"]) {
    if (await page.locator(loader).count()) {
      await page.waitForSelector(loader, { state: "detached", timeout: 30000 }).catch(() => undefined);
    }
  }
  await page.waitForTimeout(600);
}

mkdirSync(outputDir, { recursive: true });

for (const site of sites) {
  for (const viewport of viewports) {
    const profile = mkdtempSync(path.join(tmpdir(), `atlas-edge-${site.name}-${viewport.suffix}-`));
    let context;
    try {
      context = await chromium.launchPersistentContext(profile, {
        executablePath: edgePath,
        headless: true,
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        locale: "zh-CN",
        args: ["--no-first-run", "--no-default-browser-check", "--disable-gpu", "--hide-scrollbars"]
      });
      const page = context.pages()[0] ?? await context.newPage();
      for (const shot of site.shots) {
        await page.goto("about:blank");
        await page.goto(`${site.base}/#${shot.route}`, { waitUntil: "load", timeout: 60000 });
        await settlePage(page, shot.ready);
        const file = path.join(outputDir, `${site.name}-${shot.name}-${viewport.suffix}.png`);
        await page.screenshot({ path: file, fullPage: false });
        console.log(`${file} ${viewport.width}x${viewport.height}`);
      }
    } finally {
      try {
        await context?.close();
      } finally {
        rmSync(profile, { recursive: true, force: true });
      }
    }
  }
}