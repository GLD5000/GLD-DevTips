import { useEffect } from "react";
import ToggleButton from "../../elements/ToggleButton";
import tagHexLookup from "../../utilities/tagHex.js";
const TagFilter = ({ tag, setTagState, tagState }) => {
  const isActive = tagState[tag] === "active";

  function updateTagState(tag, newValue) {
    setTagState((object) => {
      return { ...object, [tag]: newValue }; // Tip return new object to trigger re-render
    });
  }

  function tagOnClick(e) {
    const tag = e.target.name;
    
    const newValue = isActive ? "visible" : "active";
    if (tag !== undefined) updateTagState(tag, newValue);
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
