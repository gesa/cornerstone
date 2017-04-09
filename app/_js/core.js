import retinaImages from './helpers/retina-images';

((doc, win) => {

  if (doc.getElementsByTagName('img').length > 0) {
    retinaImages();
  }

})(document, window);
