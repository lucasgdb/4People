// No imports: also read by scripts/indexnow.ts, which runs under plain Node.

/** The public address: canonical URLs, sitemap, OG images and JSON-LD use it. */
export const PRODUCTION_URL = 'https://4people.lucasbittencourt.dev'

/**
 * IndexNow (Bing, Yandex, Naver…): served at /<key>.txt from public/ and sent by `pnpm indexnow`
 * after a deploy. Google doesn't use IndexNow; it reads the sitemap.
 */
export const INDEXNOW_KEY = '5beb010908ceabb278eb2865f7e59dd4'
