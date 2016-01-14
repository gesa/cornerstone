/**
 * Self-invoking function that loops through all the images on the page
 * containing a 2x image and updates their sources with the appropriate path
 * <noscript>
 *   <img src="@1x-image" alt="Foo bar baz" width="100" height="100" />
 * </noscript>
 * <img src="#" data-src1x="@1x-image" data-src2x="@2x-image"
 * alt="Foo bar baz" width="100" height="100" />
 * */
(function (doc, win) {
  "use strict";

  var
    context,
    images = doc.querySelectorAll('[data-src2x]'),
    totalImages = images.length;

  function renderImage(image, source) {
    image.setAttribute('src', source);
  }

  function retinaImages() {
    if (win.devicePixelRatio !== undefined && win.devicePixelRatio >= 1.5) {
      while (totalImages--) {
        context = images[totalImages];
        if (context.dataset.src2x !== undefined) {
          renderImage(context, context.dataset.src2x);
        }
      }
    } else {
      while (totalImages--) {
        context = images[totalImages];
        if (context.dataset.src1x !== undefined) {
          renderImage(context, context.dataset.src1x);
        }
      }
    }
  }

  if (images.length > 0) {
    retinaImages();
  }

}(document, window));
