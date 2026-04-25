import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { staticRedirects } from "../redirects.config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const manifestPath = path.join(publicDir, ".static-redirects-manifest.json");

function parseFromPath(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid redirect source: ${value}`);
  }

  const trimmed = value.trim();
  let normalized = trimmed;

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  if (normalized === "/") {
    throw new Error("Redirect source `/` is not supported.");
  }

  const hasTrailingSlash = /\/+$/.test(normalized);
  const withoutTrailingSlash = normalized.replace(/\/+$/, "");
  return {
    sourceKey: withoutTrailingSlash,
    outputAsDirectory: hasTrailingSlash,
    normalizedPath: withoutTrailingSlash,
  };
}

function normalizeToPath(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid redirect destination: ${value}`);
  }

  const normalized = value.trim();
  return normalized.startsWith("/") || /^https?:\/\//.test(normalized)
    ? normalized
    : `/${normalized}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createRedirectHtml(to) {
  const escapedTo = escapeHtml(to);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${escapedTo}" />
    <meta http-equiv="refresh" content="0;url=${escapedTo}" />
    <script>
      window.location.replace(${JSON.stringify(to)});
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${escapedTo}">${escapedTo}</a>…</p>
  </body>
</html>
`;
}

function toOutputIndexFile(fromPath) {
  const relativePath = fromPath.replace(/^\/+/, "");
  return path.join(publicDir, relativePath, "index.html");
}

function toOutputHtmlFile(fromPath) {
  const relativePath = fromPath.replace(/^\/+/, "");
  return path.join(publicDir, `${relativePath}.html`);
}

async function removeIfExists(filePath) {
  await fs.rm(filePath, { force: true });

  let currentDir = path.dirname(filePath);
  while (currentDir.startsWith(publicDir) && currentDir !== publicDir) {
    try {
      await fs.rmdir(currentDir);
    } catch {
      break;
    }
    currentDir = path.dirname(currentDir);
  }
}

async function main() {
  const previousManifest = await fs
    .readFile(manifestPath, "utf8")
    .then((content) => JSON.parse(content))
    .catch(() => []);

  for (const filePath of previousManifest) {
    await removeIfExists(filePath);
  }

  const seenFromPaths = new Set();
  const generatedFiles = [];

  for (const redirect of staticRedirects) {
    const to = normalizeToPath(redirect.to);
    const fromList = Array.isArray(redirect.from) ? redirect.from : [redirect.from];

    for (const rawFrom of fromList) {
      const from = parseFromPath(rawFrom);

      if (from.normalizedPath === to) {
        throw new Error(
          `Redirect source and destination are identical: ${from.normalizedPath}`
        );
      }

      const duplicateKey = `${from.sourceKey}|${
        from.outputAsDirectory ? "dir" : "file"
      }`;
      if (seenFromPaths.has(duplicateKey)) {
        throw new Error(`Duplicate redirect source detected: ${rawFrom}`);
      }

      seenFromPaths.add(duplicateKey);

      // Always clear both legacy output shapes before generating the current one.
      await removeIfExists(toOutputIndexFile(from.normalizedPath));
      await removeIfExists(toOutputHtmlFile(from.normalizedPath));

      if (from.outputAsDirectory) {
        const indexFile = toOutputIndexFile(from.normalizedPath);
        await fs.mkdir(path.dirname(indexFile), { recursive: true });
        await fs.writeFile(indexFile, createRedirectHtml(to), "utf8");
        generatedFiles.push(indexFile);
      } else {
        const htmlFile = toOutputHtmlFile(from.normalizedPath);
        await fs.mkdir(path.dirname(htmlFile), { recursive: true });
        await fs.writeFile(htmlFile, createRedirectHtml(to), "utf8");
        generatedFiles.push(htmlFile);
      }
    }
  }

  await fs.writeFile(
    manifestPath,
    JSON.stringify(generatedFiles, null, 2),
    "utf8"
  );

  console.log(`Generated ${generatedFiles.length} static redirect page(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
