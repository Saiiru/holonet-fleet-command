import { mkdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { STARSHIP_PAGE_MANIFEST } from './starship-image-pages.mjs';

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'public', 'assets', 'starships');
const MODEL_MAP_PATH = path.join(
  ROOT,
  'src',
  'app',
  'features',
  'fleet',
  'models',
  'starship-images.ts'
);

const WIKI_BASE = 'https://starwars.fandom.com/wiki/';
function isRejectedImageUrl(url) {
  const normalized = url.toLowerCase();

  const blockedPatterns = [
    'site-community-image',
    '/wiki/special:redirect/',
    'placeholder',
    'default',
    'empty',
  ];

  return blockedPatterns.some((pattern) => normalized.includes(pattern));
}

function extFromContentType(contentType) {
  if (!contentType) return '.jpg';
  if (contentType.includes('image/png')) return '.png';
  if (contentType.includes('image/webp')) return '.webp';
  if (contentType.includes('image/gif')) return '.gif';
  return '.jpg';
}

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 HoloNetFleetCommand/1.0',
      'Referer': 'https://starwars.fandom.com/',
    },
  });

  if (!response.ok) {
    throw new Error(`Image HTTP ${response.status} for ${url}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Expected image but got "${contentType}" from ${url}`);
  }

  const ext = extFromContentType(contentType);
  const buffer = Buffer.from(await response.arrayBuffer());

  return { buffer, ext };
}

async function resolveWithBrowser(browser, candidates) {
  const page = await browser.newPage({
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });

  try {
    for (const candidate of candidates) {
      const url = `${WIKI_BASE}${candidate}`;
      try {
        await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });

        await page.waitForTimeout(1500);

        const imageUrl = await page.evaluate(() => {
          const og = document.querySelector('meta[property="og:image"]');
          const tw = document.querySelector('meta[name="twitter:image"]');
          return og?.getAttribute('content') || tw?.getAttribute('content') || null;
        });

        if (imageUrl && imageUrl.startsWith('http')) {
          return { pageUrl: url, imageUrl };
        }
      } catch {
        // tenta próxima candidata
      }
    }

    return null;
  } finally {
    await page.close();
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const imageMap = {};
  const seenImageUrls = new Map();

  try {
    for (const ship of STARSHIP_PAGE_MANIFEST) {
      const { id, name, candidates } = ship;

      try {
        console.log(`Resolving [${id}] ${name}...`);

        const resolved = await resolveWithBrowser(browser, candidates);

        if (!resolved) {
          console.warn(`No image page resolved for [${id}] ${name}`);
          continue;
        }

        if (isRejectedImageUrl(resolved.imageUrl)) {
          console.warn(`Rejected generic image for [${id}] ${name}: ${resolved.imageUrl}`);
          continue;
        }

        const duplicateCount = seenImageUrls.get(resolved.imageUrl) ?? 0;
        seenImageUrls.set(resolved.imageUrl, duplicateCount + 1);

        if (duplicateCount >= 1) {
          console.warn(`Rejected duplicate image for [${id}] ${name}: ${resolved.imageUrl}`);
          continue;
        }

        console.log(`Page:  ${resolved.pageUrl}`);
        console.log(`Image: ${resolved.imageUrl}`);

        const { buffer, ext } = await downloadImage(resolved.imageUrl);
        const outputFile = path.join(OUTPUT_DIR, `${id}${ext}`);

        await writeFile(outputFile, buffer);

        imageMap[id] = `/assets/starships/${id}${ext}`;
        console.log(`Saved -> ${path.relative(ROOT, outputFile)}`);
      } catch (error) {
        console.error(`Failed [${id}] ${name}: ${error.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  const tsContent =
    `export const STARSHIP_IMAGE_MAP: Record<number, string> = ${JSON.stringify(imageMap, null, 2)};\n`;

  await writeFile(MODEL_MAP_PATH, tsContent);

  console.log(`Generated -> ${path.relative(ROOT, MODEL_MAP_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


