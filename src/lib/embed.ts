import type { Stream } from './types';

/**
 * Turn a stream's public link into a URL that can go in an <iframe>.
 * YouTube refuses to be framed at /watch?v=..., so we rewrite it to /embed/<id>.
 * Returns null when the link isn't embeddable yet (for example a placeholder).
 */
export function embedUrl(stream: Stream): string | null {
	const id = videoIdOf(stream);
	return id ? `https://www.youtube.com/embed/${id}` : null;
}

/**
 * YouTube's own thumbnail images for a live stream, as an <img> src and srcset.
 * The _live versions are refreshed by YouTube every few minutes, so they show
 * roughly what the camera sees right now. We only ever link to YouTube's copy;
 * never download or re-host these images.
 * Returns null for offline streams and links we can't read.
 */
export function thumbnail(stream: Stream): { src: string; srcset: string } | null {
	if (!stream.live) return null;
	const id = videoIdOf(stream);
	if (!id) return null;

	const base = `https://i.ytimg.com/vi/${id}`;
	return {
		src: `${base}/hqdefault_live.jpg`,
		// hq is 480px wide, sd is 640px. Both are 4:3 with black bars, which object-cover crops off.
		srcset: `${base}/hqdefault_live.jpg 480w, ${base}/sddefault_live.jpg 640w`
	};
}

/** The 11-character YouTube video ID for a stream, or null. */
function videoIdOf(stream: Stream): string | null {
	if (stream.source !== 'youtube') return null;

	let url: URL;
	try {
		url = new URL(stream.sourceUrl);
	} catch {
		return null;
	}

	const id = youtubeVideoId(url);
	return id && /^[\w-]{11}$/.test(id) ? id : null;
}

/**
 * Pull the video ID out of the YouTube link shapes people share:
 *   https://youtu.be/<id>
 *   https://www.youtube.com/watch?v=<id>
 *   https://www.youtube.com/live/<id>   (the Share button on live streams)
 */
function youtubeVideoId(url: URL): string | null {
	if (url.hostname === 'youtu.be') return url.pathname.slice(1);

	const live = url.pathname.match(/^\/live\/([^/]+)/);
	if (live) return live[1];

	return url.searchParams.get('v');
}
