import retinaImages from './helpers/retina-images';

((doc) => {
  if (doc.getElementsByTagName('img').length > 0) {
    retinaImages();
  }
})(document);
