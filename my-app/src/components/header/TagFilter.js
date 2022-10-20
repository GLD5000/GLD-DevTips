import Button from "../../elements/Button";
function tagHexLookup(tag){
  const tagHexLookup = {
    javascript: ["#EAD41C"],
    github: ["#175A24", "#ffffff"],
    vscode: ["#48AAEB"],
  };
  tag = tag.toLowerCase();
  const returnArray = tagHexLookup[tag];
  const backgroundColour = returnArray === undefined? "#ff55bb": returnArray[0];
  const textColour = returnArray === undefined || returnArray.length < 2? "#000000": returnArray[1];
  return [backgroundColour, textColour];
}
function generateRandomHex() {
  // Generate a random Hex if tagHexLookup Fails
  // Generate a random Hex and add it to the tagHexLookup for any new tags
  return "#dd0dd0";
}
let isClicked;
const TagFilter = ({ tag, setTagState, tagState }) => {
  if (tagState[tag] === undefined) {
    initButton(tag);
  } else {
    isClicked = tagState[tag] === "active";
  }

  function initButton(tag){
    updateTagState(tag, "visible");
    isClicked = false;
  }

  function updateTagState(tag, newValue){
    setTagState((object) => {
      console.log(object);
      object[tag] = newValue;
      return object;
    });
  }


  function tagOnClick(e) {
    // filter by tag
    console.log("Tag has been clicked " + e.target.innerHTML);
    const tag = e.target.innerHTML;
    const newValue = isClicked ? "visible" : "active";
    isClicked = !isClicked;
    updateTagState(tag, newValue);
  }
  const [backgroundColour, textColour] = tagHexLookup(tag);

  return (<>
{    isClicked ? (
      <Button
        color={textColour}
        backgroundColor={backgroundColour}
        text={tag}
        clickFunction={tagOnClick}
      />

  ) : (
      <Button
      color="#000000"
      backgroundColor="#dddddd"
      text={tag}
      clickFunction={tagOnClick}
    />

  )
}
  </>
  )
};

export default TagFilter;
