import { ImageLoaderProps } from 'next/image';
import { staticFileDestination } from '~/config';

function imageLoader(imageInfo: ImageLoaderProps) {
  if (
    imageInfo.src.startsWith('https://') ||
    imageInfo.src.startsWith('http://')
  ) {
    return `${imageInfo.src}`;
  } else {
    return `${staticFileDestination}${imageInfo.src}`;
  }
}

export { imageLoader };
