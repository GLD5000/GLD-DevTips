const randomColour = {
  randomIntegerInRange(start, end) {
    return start + parseInt(Math.random() * (end - start), 10);
  },
  makeRandomHsl() {
    const hue = parseInt(Math.random() * 360, 10);
    const sat = 48 + parseInt(Math.random() * 40, 10); // 48 - 87
    const lum = 63 + parseInt(Math.random() * 25, 10); // 63 - 88
    return [hue, sat, lum];
  },
  makeRandomHslSafer() {
    const hue = randomColour.randomIntegerInRange(0, 360);
    const sat = randomColour.randomIntegerInRange(60, 90);
    const lum = randomColour.randomIntegerInRange(70, 90);
    return [hue, sat, lum];
  },
  convertHslToColourObject(hue, sat, lum, name) {
    return { name, hue, sat, lum };
  },
  makeRandomHslString() {
    return this.convertHslToString(...this.makeRandomHsl());
  },
  makeRandomHslStringSafer() {
    return this.convertHslToString(...this.makeRandomHslSafer());
  },
  makeRandomColourPartial(name) {
    return this.convertHslToColourObject(...this.makeRandomHsl(), name);
  },
  convertHslArrayToHex(hslArray) {
    const [hue] = hslArray;
    let [, sat, lum] = hslArray;

    sat /= 100;
    lum /= 100;

    const chroma = (1 - Math.abs(2 * lum - 1)) * sat;
    const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const lightness = lum - chroma / 2;
    let red = 0;
    let green = 0;
    let blue = 0;

    if (hue >= 0 && hue < 60) {
      red = chroma;
      green = x;
      blue = 0;
    } else if (hue >= 60 && hue < 120) {
      red = x;
      green = chroma;
      blue = 0;
    } else if (hue >= 120 && hue < 180) {
      red = 0;
      green = chroma;
      blue = x;
    } else if (hue >= 180 && hue < 240) {
      red = 0;
      green = x;
      blue = chroma;
    } else if (hue >= 240 && hue < 300) {
      red = x;
      green = 0;
      blue = chroma;
    } else if (hue >= 300 && hue <= 360) {
      red = chroma;
      green = 0;
      blue = x;
    }
    // Having obtained RGB, convert channels to hex
    red = Math.round((red + lightness) * 255).toString(16);
    green = Math.round((green + lightness) * 255).toString(16);
    blue = Math.round((blue + lightness) * 255).toString(16);

    // Prepend 0s, if necessary
    if (red.length === 1) red = `0${red}`;
    if (green.length === 1) green = `0${green}`;
    if (blue.length === 1) blue = `0${blue}`;
    const hex = `#${red}${green}${blue}`;
    return hex;
  },
  makeRandomHex() {
    const randomHsl = randomColour.makeRandomHslSafer();
    const randomHex = randomColour.convertHslArrayToHex(randomHsl);
    return randomHex;
  },
};

export default function getRandomColour() {
  const randomHex = randomColour.makeRandomHex();
  return randomHex;
}
