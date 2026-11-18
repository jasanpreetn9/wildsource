// Site photos. © Jasanpreet Nagra, all rights reserved: NOT covered by the
// CC BY-NC-SA 4.0 License and not part of the open catalog data.
// See src/lib/assets/photos/LICENSE.md.
//
// Before adding a photo: strip its metadata (GPS especially), and keep the
// original out of git. See /photos-incoming in .gitignore.

/** Shown wherever these photos appear. */
export const PHOTO_CREDIT = 'Photos © Jasanpreet Nagra. All rights reserved.';
import alpsSrc from './assets/photos/alps.jpg';
import pastureSrc from './assets/photos/pasture.jpg';
import sunflowerSrc from './assets/photos/sunflower.jpg';
import swanSrc from './assets/photos/swan.jpg';

export interface Photo {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export const swan: Photo = {
	src: swanSrc,
	alt: 'A mute swan feeding in clear, shallow lake water',
	width: 1040,
	height: 1300
};

export const alps: Photo = {
	src: alpsSrc,
	alt: 'Snow-capped Alpine peaks seen from above, fading into haze',
	width: 1200,
	height: 900
};

export const sunflower: Photo = {
	src: sunflowerSrc,
	alt: 'A wild sunflower in bloom against a soft green background',
	width: 1200,
	height: 900
};

export const pasture: Photo = {
	src: pastureSrc,
	alt: 'Open pasture and a line of trees under a pink evening sky',
	width: 1200,
	height: 900
};
