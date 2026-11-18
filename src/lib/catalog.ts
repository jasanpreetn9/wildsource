import streamsJson from '../../data/streams.seed.json';
import hostsJson from '../../data/hosts.seed.json';
import type { Host, Stream } from './types';

export const streams = streamsJson as Stream[];
export const hosts = hostsJson as Host[];

export function getStream(id: string): Stream | undefined {
	return streams.find((s) => s.id === id);
}

export function getHost(id: string): Host | undefined {
	return hosts.find((h) => h.id === id);
}

export function streamsByHost(hostId: string): Stream[] {
	return streams.filter((s) => s.hostId === hostId);
}

/**
 * The country a stream is in. By convention `region` always ends with the country:
 * "Alaska, US", "Etosha, Namibia", or just "Panama".
 * (v0.2 can replace this with a real country column in the database.)
 */
export function countryOf(stream: Stream): string {
	return stream.region.split(',').at(-1)?.trim() ?? stream.region;
}

/** Every country in the catalog, A to Z, for the region filter. */
export const countries: string[] = [...new Set(streams.map(countryOf))].sort((a, b) =>
	a.localeCompare(b)
);

/** Which of the six illustrated tile palettes a stream uses. Stable per stream. */
export function toneOf(stream: Stream): number {
	return streams.indexOf(stream) % 6;
}

export function hostToneOf(host: Host): number {
	return (hosts.indexOf(host) + 2) % 6;
}
