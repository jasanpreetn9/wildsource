import { streams } from '#lib/catalog.ts';
import { SITE_URL } from '#lib/config.ts';

// Built once at deploy time, like /api/streams.json, so it always matches the catalog.
export const prerender = true;

// Pages worth finding in search. Leave out data endpoints (/api/...) and, later,
// account pages like /signin.
const PAGES = ['/', '/streams', '/add', '/reuse'];

export function GET() {
	const urls = [
		...PAGES.map((path) => ({ loc: path })),
		...streams.map((s) => ({ loc: `/streams/${s.id}`, lastmod: s.added }))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`  <url><loc>${SITE_URL}${u.loc}</loc>${'lastmod' in u ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
