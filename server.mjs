import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let path = resolve(root, "." + pathname);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const entry = await stat(path);
    if (entry.isDirectory()) path = join(path, "index.html");
    const file = await stat(path);
    if (!file.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
    response.end(await readFile(path));
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    try { response.end(await readFile(join(root, "404.html"))); }
    catch { response.end("Not found"); }
  }
}).listen(port, "127.0.0.1", () => {
  process.stdout.write("Local: http://127.0.0.1:" + port + "\n");
});
