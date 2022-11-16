const randomColour = {
    _randomIntegerInRange(start, end){
        return start + parseInt(Math.random() * (end - start)); 

    },
    _makeRandomHsl() {
      const hue = parseInt(Math.random() * 360);
      const sat = 48 + parseInt(Math.random() * 40); // 48 - 87
      const lum = 63 + parseInt(Math.random() * 25); // 63 - 88
      return [hue, sat, lum];
    },
    _makeRandomHslSafer() {
      const hue = randomColour._randomIntegerInRange(0, 360);
      const sat = randomColour._randomIntegerInRange(36, 90);
      const lum = randomColour._randomIntegerInRange(65, 90);
      return [hue, sat, lum];
    },
    _convertHslToColourObject(hue, sat, lum, name) {
      return { name: name, hue: hue, sat: sat, lum: lum };
    },
    makeRandomHslString() {
      return this._convertHslToString(...this._makeRandomHsl());
    },
    makeRandomHslStringSafer() {
      return this._convertHslToString(...this._makeRandomHslSafer());
    },
    makeRandomColourPartial(name) {
      return this._convertHslToColourObject(...this._makeRandomHsl(), name);
    },
    _convertHslArrayToHex(hslArray) {
        let [hue, sat, lum] = hslArray;
    
        sat /= 100;
        lum /= 100;
    
        let chroma = (1 - Math.abs(2 * lum - 1)) * sat,
          x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1)),
          lightness = lum - chroma / 2,
          red = 0,
          green = 0,
          blue = 0;
    
        if (0 <= hue && hue < 60) {
          red = chroma;
          green = x;
          blue = 0;
        } else if (60 <= hue && hue < 120) {
          red = x;
          green = chroma;
          blue = 0;
        } else if (120 <= hue && hue < 180) {
          red = 0;
          green = chroma;
          blue = x;
        } else if (180 <= hue && hue < 240) {
          red = 0;
          green = x;
          blue = chroma;
        } else if (240 <= hue && hue < 300) {
          red = x;
          green = 0;
          blue = chroma;
        } else if (300 <= hue && hue <= 360) {
          red = chroma;
          green = 0;
          blue = x;
        }
        // Having obtained RGB, convert channels to hex
        red = Math.round((red + lightness) * 255).toString(16);
        green = Math.round((green + lightness) * 255).toString(16);
        blue = Math.round((blue + lightness) * 255).toString(16);
    
        // Prepend 0s, if necessary
        if (red.length === 1) red = "0" + red;
        if (green.length === 1) green = "0" + green;
        if (blue.length === 1) blue = "0" + blue;
        const hex = "#" + red + green + blue;
        return hex;
      },
    makeRandomHex(){
        const randomHsl = randomColour._makeRandomHslSafer();
        const randomHex = randomColour._convertHslArrayToHex(randomHsl);
        return randomHex;

    },
  };

export default function getRandomColour() {
    const randomHex = randomColour.makeRandomHex();
    return randomHex;
}
