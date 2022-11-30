import Button from "../../elements/Button";
import tagHexLookup from "../../utilities/tagHex";

const Tag = ({ tag, setTagStateFromTip}) => {
  function tagOnClick(e) {
    const tag = e.target.innerHTML;
    setTagStateFromTip(tag);
  }
  const {backgroundColour, textColour} = tagHexLookup(tag);
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
