import TagButton from "../../elements/TagButton";
import tagHexLookup from "../../utilities/tagHex";

const Tag = ({ tag, setTagStateFromTip}) => {
  function tagOnClick(e) {
    const tag = e.target.innerHTML;
    setTagStateFromTip(tag);
  }
  const {backgroundColour, textColour} = tagHexLookup(tag);
  return (
    <TagButton
      color={textColour}
      backgroundColor={backgroundColour}
      text={tag}
      clickFunction={tagOnClick}
    />
  );
};

export default Tag;
