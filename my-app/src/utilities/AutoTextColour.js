const colourspace = {
    _hexDigitsToDecimal(charA, charB = charA) {
      return `0x${charA}${charB}` / 255;
    },
    _splitHexString(hex) {
      return hex.length === 7
        ? [
            [hex[1], hex[2]],
            [hex[3], hex[4]],
            [hex[5], hex[6]],
          ]
        : [
            [hex[1], hex[1]],
            [hex[2], hex[2]],
            [hex[3], hex[3]],
          ];
    },
    _getSrgbArrayFromHexArray(hex) {
      const splitHex = this._splitHexString(hex);
      return splitHex.map((digits) => this._hexDigitsToDecimal(...digits));
    },
    _convertColourHexToSrgb(colour) {
      [colour.red, colour.green, colour.blue] = this._getSrgbArrayFromHexArray(
        colour.hex
      );
      return colour;
    },
    _convertSrgbToHsl(colour) {
      colour.red = constraints._constraintLookupB["red"](colour.red);
      colour.green = constraints._constraintLookupB["green"](colour.green);
      colour.blue = constraints._constraintLookupB["blue"](colour.blue);
  
      let { red, green, blue } = colour;
  
      let cmin = Math.min(red, green, blue),
        cmax = Math.max(red, green, blue),
        delta = cmax - cmin,
        hue = 0,
        sat = 0,
        lum = 0;
  
      if (delta == 0) hue = 0;
      else if (cmax == red) hue = ((green - blue) / delta) % 6;
      else if (cmax == green) hue = (blue - red) / delta + 2;
      else hue = (red - green) / delta + 4;
  
      hue = hue * 60;
  
      if (hue < 0) hue += 360;
  
      lum = (cmax + cmin) / 2;
      sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lum - 1));
      sat = +(sat * 100);
      lum = +(lum * 100);
      [colour.hue, colour.sat, colour.lum] = [hue, sat, lum];
  
      return colour;
    },
    _convertHslToHex(colour) {
      colour.hue = constraints._constraintLookupB["hue"](colour.hue);
      colour.sat = constraints._constraintLookupB["sat"](colour.sat);
      colour.lum = constraints._constraintLookupB["lum"](colour.lum);
  
      let { hue, sat, lum } = colour;
  
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
      if (red.length == 1) red = "0" + red;
      if (green.length == 1) green = "0" + green;
      if (blue.length == 1) blue = "0" + blue;
      colour.hex = "#" + red + green + blue;
      return colour;
    },
    _convertSrgbToHex(colour) {
      return this._convertHslToHex(this._convertSrgbToHsl(colour));
    },
    convertSrgbToLuminance(RsRGB, GsRGB, BsRGB) {
        const R = modifyColourValue(RsRGB);
        const G = modifyColourValue(GsRGB);
        const B = modifyColourValue(BsRGB);
        return sumColourValues(R, G, B);
      },
    sumColourValues(R, G, B) {
        const redMult = 0.2126;
        const greenMult = 0.7152;
        const blueMult = 0.0722;
        return redMult * R + greenMult * G + blueMult * B;
      },
    modifyColourValue(value) {
        return value <= 0.04045
          ? value / 12.92
          : Math.pow((value + 0.055) / 1.055, 2.4);
      },
    
  };
  


  



export default function AutoTextColour(hexColour) {
    function convertHexToLuminance(hex){
        return "luminance";
    }
  return 
}
