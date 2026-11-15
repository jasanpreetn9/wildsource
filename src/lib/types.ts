export const HABITATS = ['Woodland', 'Wetland', 'Birds', 'Grassland', 'Marine', 'Garden'] as const;

export type Habitat = (typeof HABITATS)[number] | 'Other';

export interface Stream {
	id: string;
	title: string;
	habitat: Habitat;
	region: string;
	source: 'youtube' | 'twitch' | 'hls';
	sourceUrl: string;
	hostId: string;
	about: string;
	live: boolean;
	/** ISO date the stream was last seen live, when it is offline. */
	lastLive?: string;
	/** Camera model, when the owner has told us. */
	camera?: string;
	/** ISO date the stream joined the catalog. */
	added: string;
	/**
	 * Why WildSource may show this stream. The video always belongs to its owner;
	 * this records what they allowed, not a license we grant.
	 * - embed-allowed: the owner left embedding on, but hasn't been asked directly.
	 * - owner-approved: the owner said yes to being listed.
	 */
	permission: Permission;
}

export type Permission = 'embed-allowed' | 'owner-approved';

export const PERMISSION_LABELS: Record<Permission, string> = {
	'embed-allowed': 'Embedded via the owner’s player',
	'owner-approved': 'Listed with the owner’s permission'
};

export interface Host {
	id: string;
	name: string;
	region: string;
	since: number;
	camType: string;
	/** Their own site or channel, linked as credit. */
	url: string;
	/** Only in the host's own words. Leave out rather than writing one for them. */
	quote?: string;
	bio?: string;
}
