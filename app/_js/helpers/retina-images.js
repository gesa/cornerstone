/**
 * Function that loops through all the images on the page containing a 2x image
 * (that is, an image tag with a `data-src2x` attribute) and updates their
 * sources with the appropriate path.
 * @module helpers/retina-images
 * @returns {function} to be invoked as desired.
 * @example
 * <noscript>
 *   <img src="@1x-image" alt="Foo bar baz" width="100" height="100" />
 * </noscript>
 * <img src="#" data-src1x="@1x-image" data-src2x="@2x-image"
 * alt="Foo bar baz" width="100" height="100" />
 * */
const images = document.querySelectorAll('[data-src2x]');
const pixelRatio = window.devicePixelRatio && window.devicePixelRatio >= 1.5 ? 'src2x' : 'src1x';

export default function retinaImages() {
  images.forEach((current) => {
    if (current.dataset && current.dataset[pixelRatio]) {
      current.setAttribute('src', current.dataset[pixelRatio]);
    }
  });
}
