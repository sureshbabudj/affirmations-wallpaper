import * as confident from './confident.json';
import * as grateful from './grateful.json';
import * as peaceful from './peaceful.json';
import * as focused from './focused.json';
import * as motivational from './motivational.json';
import * as romantic from './romantic.json';

export const MOODS = {
  confident,
  grateful,
  peaceful,
  focused,
  motivational,
  romantic,
};

export const MY_CLOUDINARY_NAME = 'dcnbz3qtp';
export const MOOD_IMAGE_FOLDER = 'mood-images';

export const SMALL_THUMB_IMG_WIDTH = 150;
export const SMALL_THUMB_IMG_HEIGHT = 200;
export const THUMB_IMG_WIDTH = 300;
export const THUMB_IMG_HEIGHT = 400;
export const FULL_IMG_WIDTH = 1080;
export const FULL_IMG_HEIGHT = 1920;
export const IMG_URL_FORMAT = `https://res.cloudinary.com/${MY_CLOUDINARY_NAME}/image/upload/c_fill,w_{IMAGE_WIDTH},h_{IMAGE_HEIGHT},g_auto,f_auto,q_auto/${MOOD_IMAGE_FOLDER}/{MOOD}/{IMAGE_ID}.jpg`;
