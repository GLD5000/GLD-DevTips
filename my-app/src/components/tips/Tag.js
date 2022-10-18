import Button from "../../elements/Button";

const tagHexLookup = {
  JavaScript: "#EAD41C",
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

const Tag = ({ tag }) => {
  const backgroundColor = tagHexLookup[tag] || generateRandomHex();

  return (
    <Button
      color="black"
      backgroundColor={backgroundColor}
      text={tag}
      clickFunction={tagOnClick}
    />
  );
};

export default Tag;
