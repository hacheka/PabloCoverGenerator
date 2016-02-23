const stateManager = require('./stateManager');

const calculateSourceCoordinates = (width, height, ratio) => {
  let srcWidth = width;
  let srcHeight = height;
  let dx = 0;
  let dy = 0;
  const realRatio = width / height;

  if (realRatio < ratio) {
    srcHeight = width / ratio;
    dy = (height - srcHeight) / 2;
  } else if (realRatio > ratio) {
    srcWidth = height / ratio;
    dx = (width - srcWidth) / 2;
  }

  return {
    width: srcWidth,
    height: srcHeight,
    dx,
    dy
  };
};

const renderImageToState = (src, imageNumber) => {
  const image = new Image();
  image.onload = () => {
    const ratio = imageNumber === 1 ? 1.5 : 1;
    const srcCoords = calculateSourceCoordinates(image.width, image.height, ratio);
    const imageData = {
      image,
      width: srcCoords.width,
      height: srcCoords.height,
      dx: srcCoords.dx,
      dy: srcCoords.dy
    };

    if (imageNumber === 1) {
      stateManager.setImage1(imageData);
    } else {
      stateManager.setImage2(imageData);
    }
  };
  image.src = src;
};

const loadImageFromFile = (src, imageNumber) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    renderImageToState(e.target.result, imageNumber);
  };
  reader.readAsDataURL(src);
};

module.exports = {
  loadImageFromFile,
  renderImageToState
};
