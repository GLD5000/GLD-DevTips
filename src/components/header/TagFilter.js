import ToggleButton from "../../elements/ToggleButton";
import tagHexLookup from "../../utilities/tagHex.js";
const TagFilter = ({ tag, updateTagState, tagState }) => {
  const isActive = tagState[tag] === "active";

  function tagOnClick(e) {
    const tag = e.target.name;

    if (tag !== undefined) updateTagState(tag);
  }
  const { backgroundColour, textColour } = tagHexLookup(tag);
  const ButtonClasses = ` border-1  rounded hover:border-current py-1 px-2 tag-filter-btn`;

  return (
    <ToggleButton
      name={tag}
      id={tag + "filterButton"}
      color={textColour}
      backgroundColor={backgroundColour}
      text={tag}
      clickFunction={tagOnClick}
      className={ButtonClasses}
      toggle={isActive}
    />
  );
};

export default TagFilter;
