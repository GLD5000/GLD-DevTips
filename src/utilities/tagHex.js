import getRandomColour from './randomColour';
import AutoTextColour from './autoTextColour';
import { tagColours } from '../App';

export default function tagHexLookup(tag) {
  const lowerCaseTag = tag.toLowerCase();
  const tagNotPresent = tagColours[lowerCaseTag] === undefined;

  if (tagNotPresent) {
    const backgroundColour = getRandomColour();
    const textColour = AutoTextColour(backgroundColour);
    tagColours[lowerCaseTag] = {
      name: tag,
      backgroundColour: backgroundColour,
      textColour: textColour,
    };
  }

  return tagColours[lowerCaseTag];
}
