import getRandomColour from "./randomColour";
import AutoTextColour from "./autoTextColour";

const tagHexLookupObject = { //State
  javascript: ["#EAD41C", "#000000"],
  github: ["#3B6FAB", "#ffffff"],
  vscode: ["#48AAEB", "#000000"],
};


export default function tagHexLookup(tag){
    tag = tag.toLowerCase();
    const tagNotPresent = tagHexLookupObject[tag] === undefined;
    
    if (tagNotPresent) {
      const backgroundColour = getRandomColour();
      const textColour = AutoTextColour(backgroundColour);
      tagHexLookupObject[tag] = [backgroundColour, textColour];
    }
    
    const tagColours = tagHexLookupObject[tag];
    return tagColours;
  
  }
