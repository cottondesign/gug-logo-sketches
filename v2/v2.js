const logoWidth = 75;
const logoHeight = 75;

// create canvas
const canvasWrapper = document.querySelector(".cotton--canvas-wrapper");
const canvas = document.createElement('canvas');
canvas.classList.add('cotton--main-canvas');
canvas.width = logoWidth;
canvas.height = logoHeight;
canvasWrapper.appendChild(canvas);


const ctxMain = canvas.getContext('2d', { willReadFrequently: true });
ctxMain.filter = 'blur(15px)';
// ctxMain.fillStyle = '#3498db';
// ctxMain.fillRect(0, 0, canvas.width, canvas.height);

let capturedCanvas;

function captureDOM() {
  const captureElement = document.getElementById('capture');

  html2canvas(captureElement, { scale: 1 }).then((tempCanvas) => {
    capturedCanvas = tempCanvas;
    // drawCapturedCanvas();
  }).catch((error) => {
    console.error('Error capturing content:', error);
  });
}

function drawCapturedCanvas() {
  if (!capturedCanvas) return;

  // Calculate offsets
  const offsetX = window.innerWidth*0.1;
  const offsetY = window.innerHeight/2 - 5/2;
  const scrollY = window.scrollY;

  // Clear the canvas before redrawing
  ctxMain.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the captured content onto the canvas with offsets
  ctxMain.drawImage(
    capturedCanvas,
    offsetX,                        // Offset the source x position by canvas offset
    scrollY + offsetY,              // Offset the source y position by scroll position and canvas offset
    window.innerWidth*0.8,          // Source width
    5,                              // Source height
    0,                              // Destination x on the canvas
    0,                              // Destination y on the canvas
    logoWidth,                      // Destination width on the canvas
    800 // stretch vertically       // Destination height on the canvas
  );
}

document.addEventListener('DOMContentLoaded', captureDOM);
window.addEventListener('scroll', drawCapturedCanvas);
window.addEventListener('resize', () => {
  // Update canvas dimensions
  captureDOM();
});