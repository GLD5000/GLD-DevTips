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

const TagFilter = ({ tag, setFilterQuerySet, filterQuerySet }) => {
  const isClicked = filterQuerySet.includes(tag);
  function tagOnClick(e) {
    // filter by tag
    console.log("Tag has been clicked " + e.target.innerHTML);
  }
  const lookupColours = isClicked
    ? tagHexLookup[tag.toLowerCase()] || [generateRandomHex(), "#000000"]
    : ["#dddddd", "#000000"];
  const backgroundColour = lookupColours[0];
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
