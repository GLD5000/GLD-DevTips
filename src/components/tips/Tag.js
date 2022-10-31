import Button from "../../elements/Button";
import tagHexLookup from "../../utilities/tagHex";

const Tag = ({ tag, setTagState}) => {
  function updateTagState(tag, newValue){
    setTagState((object) => {
      return {...object, [tag]: newValue}; // Tip return new object to trigger re-render
    });
  }
  function tagOnClick(e) {
    const tag = e.target.innerHTML;
    updateTagState(tag, "active");
  }
  const [backgroundColour, textColour] = tagHexLookup(tag);
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
