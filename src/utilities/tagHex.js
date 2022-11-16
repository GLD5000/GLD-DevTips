export default function tagHexLookup(tag){
    const tagHexLookup = { //State
      javascript: ["#EAD41C"],
      github: ["#3B6FAB", "#ffffff"],
      vscode: ["#48AAEB"],
    };
    tag = tag.toLowerCase();
    const returnArray = tagHexLookup[tag];
    const backgroundColour = returnArray === undefined? "#ff55bb": returnArray[0];
    const textColour = returnArray === undefined || returnArray.length < 2? "#000000": returnArray[1];
    return [backgroundColour, textColour];
  }