import { error } from '@sveltejs/kit';
import { getHost, hosts, streamsByHost } from '#lib/catalog.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const host = getHost(params.id);
	if (!host) error(404, 'Host not found');

	return {
		host,
		cameras: streamsByHost(host.id),
		others: hosts.filter((h) => h.id !== host.id)
	};
};
