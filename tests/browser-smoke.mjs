import { strict as assert } from "node:assert";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, webkit, devices } from "playwright";

const port = "4188";
const base = "http://127.0.0.1:" + port;
const server = spawn(process.execPath, ["server.mjs"], { cwd: process.cwd(), env: { ...process.env, PORT: port }, stdio: ["ignore", "pipe", "pipe"] });
const browsers = [chromium, webkit];
try {
  await Promise.race([
    new Promise((resolve, reject) => {
      server.stdout.once("data", resolve);
      server.once("exit", code => reject(new Error("server exited with " + code)));
    }),
    delay(5000).then(() => { throw new Error("server start timed out"); })
  ]);
  await mkdir("artifacts", { recursive: true });
  for (const browserType of browsers) {
    const browser = await browserType.launch({ headless: true });
    try {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(base + "/", { waitUntil: "domcontentloaded" });
      assert.match(await page.title(), /Bespoke Event Planner/);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator("#hero-image").getAttribute("src"), "assets/media/after-dark-film.webp");
      assert.equal(await page.locator(".hero-switch button").count(), 3);
      assert.equal(await page.locator(".world-chapter").count(), 0);
      assert.match(await page.locator(".morph-step[data-step=\"0\"] h3").textContent(), /voice note/i);
      const switchBounds = await page.locator(".hero-switch").boundingBox();
      assert.ok(switchBounds && switchBounds.y < 650, "world switcher is not prominent in the first desktop screen");
      if (browserType === chromium) await page.screenshot({ path: "artifacts/after-dark-desktop.jpg", type: "jpeg", quality: 65 });
      const still = page.locator('.hero-switch button[data-select-world="stillness"]');
      await still.scrollIntoViewIfNeeded();
      const scrollBefore = await page.evaluate(() => scrollY);
      await still.click();
      await page.waitForFunction(() => document.querySelector("#hero-image")?.getAttribute("src") === "assets/media/stillness-film.webp");
      assert.equal(await page.locator("body").getAttribute("data-world"), "stillness");
      assert.equal(await still.getAttribute("aria-pressed"), "true");
      assert.match(await page.locator(".morph-step[data-step=\"0\"] h3").textContent(), /grandmother/i);
      assert.ok(Math.abs((await page.evaluate(() => scrollY)) - scrollBefore) < 4, "world switch changed scroll position");
      if (browserType === chromium) await page.screenshot({ path: "artifacts/stillness-desktop.jpg", type: "jpeg", quality: 65 });
      await page.locator('.hero-switch button[data-select-world="off-script"]').click();
      await page.waitForFunction(() => document.querySelector("#hero-image")?.getAttribute("src") === "assets/media/off-script-film.webp");
      assert.equal(await page.locator("body").getAttribute("data-world"), "off-script");
      assert.match(await page.locator(".morph-step[data-step=\"0\"] h3").textContent(), /places she called/i);
      if (browserType === chromium) await page.screenshot({ path: "artifacts/off-script-desktop.jpg", type: "jpeg", quality: 65 });

      await page.locator("#dna-answer").fill("Old cinema tickets");
      await page.locator("#dna-next").click();
      await page.locator("#dna-answer").fill("A summer evening in Madrid");
      await page.locator("#dna-next").click();
      await page.locator("#dna-back").click();
      assert.equal(await page.locator("#dna-answer").inputValue(), "A summer evening in Madrid");
      await page.locator("#dna-next").click();
      await page.locator("#dna-answer").fill("A long formal speech");
      await page.locator("#dna-next").click();
      await page.locator("#dna-answer").fill("Wonder and laughter");
      await page.locator("#dna-next").click();
      assert.equal(await page.locator(".dna-result").isVisible(), true);
      assert.match(await page.locator("#dna-interpretation").textContent(), /Old cinema tickets/);
      assert.match(await page.locator("#dna-mail").getAttribute("href"), /^mailto:nataliaefimova\.com@gmail\.com/);
      await page.locator("#dna-edit").click();
      assert.equal(await page.locator("#dna-answer").inputValue(), "Wonder and laughter");
      assert.equal(errors.length, 0, errors.join("; "));
      await context.close();

      const mobile = await browser.newContext({ ...devices["iPhone 13"], reducedMotion: "reduce" });
      const phone = await mobile.newPage();
      await phone.goto(base + "/", { waitUntil: "domcontentloaded" });
      const mobileSwitch = await phone.locator(".hero-switch").boundingBox();
      assert.ok(mobileSwitch && mobileSwitch.y < 650, "world switcher is not prominent in the first mobile screen");
      const geometry = await phone.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      if (geometry.scroll > geometry.client + 4) {
        const offenders = await phone.evaluate(() => [...document.querySelectorAll("body *")].map(e => ({ tag: e.tagName, className: String(e.className).slice(0,80), right: Math.round(e.getBoundingClientRect().right), width: Math.round(e.getBoundingClientRect().width) })).filter(x => x.right > innerWidth + 5).sort((a,b) => b.right - a.right).slice(0,12));
        console.log("Mobile overflow elements:", JSON.stringify(offenders));
      }
      assert.ok(geometry.scroll <= geometry.client + 4, "mobile homepage overflows horizontally: " + JSON.stringify(geometry));
      await phone.locator(".menu-button").click();
      assert.equal(await phone.locator(".menu-button").getAttribute("aria-expanded"), "true");
      assert.equal(await phone.locator(".site-nav").isVisible(), true);
      await phone.locator(".site-nav a[href='contact/']").click();
      await phone.waitForURL(base + "/contact/");
      assert.equal(await phone.locator("h1").count(), 1);
      const contactWidth = await phone.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      assert.ok(contactWidth.scroll <= contactWidth.client + 4, "mobile contact overflows horizontally: " + JSON.stringify(contactWidth));
      if (browserType === chromium) {
        await phone.goto(base + "/", { waitUntil: "domcontentloaded" });
        await phone.screenshot({ path: "artifacts/mobile-home.jpg", type: "jpeg", quality: 65 });
      }
      await mobile.close();
      console.log(browserType.name() + ": desktop worlds, Event DNA, mobile menu and layout passed.");
    } finally {
      await browser.close();
    }
  }
  const videoContext = await chromium.launch({ headless: true });
  try {
    const page = await videoContext.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: "no-preference" });
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("#hero-video")?.getAttribute("src")?.endsWith("after-dark-loop.mp4"));
    const response = await page.request.get(base + "/assets/media/after-dark-loop.mp4");
    assert.equal(response.status(), 200);
    assert.match(response.headers()["content-type"], /video\/mp4/);
    for (const name of ["stillness", "off-script"]) {
      const clip = await page.request.get(base + "/assets/media/" + name + "-loop.mp4");
      assert.equal(clip.status(), 200);
      assert.match(clip.headers()["content-type"], /video\/mp4/);
    }
    await page.waitForFunction(() => document.querySelector("#hero-video")?.currentTime > 0.2);
    console.log("All three live-action films load; the selected muted film advances.");
  } finally {
    await videoContext.close();
  }
} finally {
  server.kill();
}
