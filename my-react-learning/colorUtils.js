function hexToRgb(hex) {
  hex = hex.replace("#", ""); // remove the "#"
  const r = parseInt(hex.substring(0, 2), 16); // "C1" → 193, base 16
  const g = parseInt(hex.substring(2, 4), 16); // "69" → 105
  const b = parseInt(hex.substring(4, 6), 16); // "52" → 82
  return { r, g, b };
}

function rgbToHsl({ r, g, b }) {
  // normalize to 0–1
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min; // the spread between brightest & darkest

  // --- Lightness ---
  let l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    // delta 0 means gray, keep h=0 s=0
    // --- Saturation ---
    s = delta / (1 - Math.abs(2 * l - 1));

    // --- Hue: which channel is the max decides the base angle ---
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60); // convert to degrees
    if (h < 0) h += 360; // keep it positive
  }

  // round to clean numbers
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

function hexToHsl(hex) {
  return rgbToHsl(hexToRgb(hex));
}

console.log(hexToHsl("#C16952")); //
