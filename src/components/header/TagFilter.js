import ToggleButton from "../../elements/ToggleButton";
import tagHexLookup from "../../utilities/tagHex.js";
const TagFilter = ({ tag, updateTagState, tagState }) => {
  const isActive = tagState[tag] === "active";


  function tagOnClick(e) {
    const tag = e.target.name;
    
    if (tag !== undefined) updateTagState(tag);
  }
  const { backgroundColour, textColour } = tagHexLookup(tag);
  const className = "btn tag-filter-btn";

  return (
        <ToggleButton
          name={tag}
          id={tag + "filterButton"}
          color={textColour}
          backgroundColor={backgroundColour}
          text={tag}
          clickFunction={tagOnClick}
          className={className}
          toggle={isActive}
        />
  );
};

export default TagFilter;
