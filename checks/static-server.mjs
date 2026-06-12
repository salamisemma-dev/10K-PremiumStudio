import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

export function startStaticServer(rootDir) {
  const root = resolve(rootDir);

  const server = createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const filePath = normalize(join(root, requestedPath));

    if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "content-type": types[extname(filePath)] ?? "application/octet-stream" });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolveServer, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Unable to determine static server address"));
        return;
      }
      resolveServer({ server, url: `http://127.0.0.1:${address.port}` });
    });
  });
}
