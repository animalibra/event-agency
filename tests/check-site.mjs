import { strict as assert } from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const pages = ["index.html", "private-events-madrid/index.html", "destination-celebrations-spain/index.html", "bespoke-experiences-spain/index.html", "about/index.html", "contact/index.html"];
const root = process.cwd();
const html = Object.fromEntries(pages.map(path => [path, readFileSync(path, "utf8")]));
for (const [path, source] of Object.entries(html)) {
  assert.match(source, /<html lang="en">/i, path + ": English language");
  assert.match(source, /<main\b/i, path + ": main landmark");
  assert.equal((source.match(/<h1\b/gi) || []).length, 1, path + ": one H1");
  assert.match(source, /<link rel="canonical" href="https:\/\/animalibra\.github\.io\/event-agency\//, path + ": canonical");
  assert.match(source, /<meta name="description"/, path + ": description");
  for (const match of source.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|#)/.test(ref)) continue;
    const resolved = new URL(ref, "https://example.com/event-agency/" + (path === "index.html" ? "" : path.replace(/index\.html$/, "")));
    const relative = resolved.pathname.replace(/^\/event-agency\//, "");
    const target = !relative ? "index.html" : relative.endsWith("/") ? relative + "index.html" : relative;
    assert.ok(existsSync(target), path + ": missing " + ref + " → " + target);
  }
}
const home = html["index.html"];
assert.equal((home.match(/<section\b/g) || []).length, 8, "homepage has eight scenes (world chapters are articles)");
for (const world of ["after-dark", "stillness", "off-script"]) {
  assert.match(home, new RegExp('data-select-world="' + world + '"'), "world control " + world);
  assert.ok(existsSync("assets/media/" + world + ".png"), "world image " + world);
}
assert.ok(existsSync("assets/media/story-atlas.png"), "story atlas");
assert.match(readFileSync("portrait-preview.html", "utf8"), /name="robots" content="noindex,nofollow"/);
assert.match(readFileSync("assets/site.css", "utf8"), /prefers-reduced-motion:reduce/);
new Function(readFileSync("assets/site.js", "utf8"));

const port = "4187";
const server = spawn(process.execPath, ["server.mjs"], { cwd: root, env: { ...process.env, PORT: port }, stdio: ["ignore", "pipe", "pipe"] });
try {
  await Promise.race([
    new Promise((resolve, reject) => {
      server.stdout.once("data", resolve);
      server.once("exit", code => reject(new Error("server exited: " + code)));
    }),
    delay(5000).then(() => { throw new Error("server start timed out"); })
  ]);
  for (const route of ["/", "/private-events-madrid/", "/destination-celebrations-spain/", "/bespoke-experiences-spain/", "/about/", "/contact/", "/assets/site.css", "/assets/site.js"]) {
    const response = await fetch("http://127.0.0.1:" + port + route);
    assert.equal(response.status, 200, route + " should load directly");
    assert.ok((await response.text()).length > 100, route + " should have content");
  }
  console.log("Site structure, references, JavaScript syntax and nested HTTP routes passed.");
} finally {
  server.kill();
}
