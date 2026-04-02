import {
  IMG_URL_FORMAT,
  SMALL_THUMB_IMG_WIDTH,
  SMALL_THUMB_IMG_HEIGHT,
  MOODS as MOOD_DATA,
} from './data';

const generateMoodImages = (mood: string, width: number, height: number) => {
  const data = (MOOD_DATA as any)[mood];
  if (!data || !data.default) return [];

  return data.default.map((item: any) => {
    return IMG_URL_FORMAT.replace('{IMAGE_WIDTH}', width.toString())
      .replace('{IMAGE_HEIGHT}', height.toString())
      .replace('{MOOD}', mood)
      .replace('{IMAGE_ID}', item.unsplashId);
  });
};

export const MOOD_IMAGES: Record<string, string[]> = {
  confident: generateMoodImages('confident', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
  grateful: generateMoodImages('grateful', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
  peaceful: generateMoodImages('peaceful', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
  focused: generateMoodImages('focused', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
  motivational: generateMoodImages('motivational', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
  romantic: generateMoodImages('romantic', SMALL_THUMB_IMG_WIDTH, SMALL_THUMB_IMG_HEIGHT),
};

export const getCloudinaryUrl = (
  unsplashId: string,
  mood: string,
  width: number,
  height: number
) => {
  return IMG_URL_FORMAT.replace('{IMAGE_WIDTH}', width.toString())
    .replace('{IMAGE_HEIGHT}', height.toString())
    .replace('{MOOD}', mood)
    .replace('{IMAGE_ID}', unsplashId);
};
