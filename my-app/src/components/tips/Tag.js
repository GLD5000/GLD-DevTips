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


const Tag = ({ tag, setTagState}) => {
  const lookupColours = tagHexLookup[tag.toLowerCase()] || [generateRandomHex(), "#000000"];
  const backgroundColour = lookupColours[0] || generateRandomHex();
  const textColour = lookupColours[1] || "#000000";
  function updateTagState(tag, newValue){
    setTagState((object) => {
      return {...object, [tag]: newValue}; // Tip return new object to trigger re-render
    });
  }
  function tagOnClick(e) {
    const tag = e.target.innerHTML;
    updateTagState(tag, "active");
  }

  return (
    <Button
      color={textColour}
      backgroundColor={backgroundColour}
      text={tag}
      clickFunction={tagOnClick}
    />
  );
};

export default Tag;
