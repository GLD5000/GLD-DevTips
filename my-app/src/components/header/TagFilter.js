import Button from "../../elements/Button";
const tagHexLookup = {
  javascript: ["#EAD41C"],
  github: ["#175A24", "#ffffff"],
  vscode: ["#48AAEB"],
};

function generateRandomHex() {
  // Generate a random Hex if tagHexLookup Fails
  // Generate a random Hex and add it to the tagHexLookup for any new tags
  return "#dddddd";
}

function tagOnClick() {
  // filter by tag
  console.log("Tag has been clicked");
}

const TagFilter = ({ tag }) => {
  const lookupColours = tagHexLookup[tag.toLowerCase()] || [generateRandomHex(), "#000000"];
  const backgroundColour = lookupColours[0] || generateRandomHex();
  const textColour = lookupColours[1] || "#000000";

  return (
    <Button
      color={textColour}
      backgroundColor={backgroundColour}
      text={tag}
      clickFunction={tagOnClick}
    />
  );
};

export default TagFilter;
