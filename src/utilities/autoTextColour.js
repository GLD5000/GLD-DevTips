const colourspace = {
  convertHexToSrgbArray(hexIn) {
    function getSrgbArrayFromHexArray(hex) {
      function hexDigitsToDecimal(charA, charB = charA) {
        return `0x${charA}${charB}` / 255;
      }
      function splitHexString(string) {
        return string.length === 7
          ? [
              [string[1], string[2]],
              [string[3], string[4]],
              [string[5], string[6]],
            ]
          : [
              [string[1], string[1]],
              [string[2], string[2]],
              [string[3], string[3]],
            ];
      }

      const splitHex = splitHexString(hex);
      return splitHex.map((digits) => hexDigitsToDecimal(...digits));
    }
    const srgbArray = getSrgbArrayFromHexArray(hexIn);
    return srgbArray;
  },
  convertSrgbToHslArray(srgbArray) {
    const [red, green, blue] = srgbArray;

    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);
    const delta = cmax - cmin;
    let hue = 0;
    let sat = 0;
    let lum = 0;

    if (delta === 0) hue = 0;
    else if (cmax === red) hue = ((green - blue) / delta) % 6;
    else if (cmax === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;

    hue *= 60;

    if (hue < 0) hue += 360;

    lum = (cmax + cmin) / 2;
    sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lum - 1));
    sat = +(sat * 100);
    lum = +(lum * 100);
    const hslArray = [hue, sat, lum];

    return hslArray;
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
  convertSrgbToHex(srgbArray) {
    return this.convertHslArrayToHex(this.convertSrgbToHslArray(srgbArray));
  },
  convertSrgbToLuminance(args) {
    const modified = args.map(modifyColourValue);
    const summed = sumColourValues(...modified);
    return summed;

    function modifyColourValue(value) {
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }
    function sumColourValues(R, G, B) {
      const redMult = 0.2126;
      const greenMult = 0.7152;
      const blueMult = 0.0722;
      return redMult * R + greenMult * G + blueMult * B;
    }
  },

  convertHexToLuminance(hex) {
    const srgbArray = this.convertHexToSrgbArray(hex);
    const luminance = this.convertSrgbToLuminance(srgbArray);
    return luminance;
  },
  backgroundLuminanceToTextColour(backgroundLuminance) {
    function luminanceAboveCutoff(luminance) {
      const luminanceCutoff = 0.1791287847;
      return luminance > luminanceCutoff;
    }

    const backgroundLuminanceIsAboveCutoff = luminanceAboveCutoff(backgroundLuminance);
    const textColour = backgroundLuminanceIsAboveCutoff ? '#000000' : '#ffffff';
    return textColour;
  },
  autoTextColourFromHex(hex) {
    const backgroundLuminance = colourspace.convertHexToLuminance(hex);
    const textColour = colourspace.backgroundLuminanceToTextColour(backgroundLuminance);
    return textColour;
  },
};

export default function autoTextColour(hex) {
  return colourspace.autoTextColourFromHex(hex);
}
