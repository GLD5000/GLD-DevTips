import { useEffect } from "react";
import ToggleButton from "../../elements/ToggleButton";
import tagHexLookup from "../../utilities/tagHex.js";
const TagFilter = ({ tag, setTagState, tagState }) => {
  const isActive = tagState[tag] === "active";
 // if (tag === "Github") console.log(`${tag} isActive ${isActive}`);

  function updateTagState(tag, newValue) {
    setTagState((object) => {
      return { ...object, [tag]: newValue }; // Tip return new object to trigger re-render
    });
  }
  // function tagOnPointerOver(e){
  //   pointer = e.target.id;
  // };

  function tagOnClick(e) {
    // console.log(pointer);
    // console.log(e.target.id);
    // if (pointer !== e.target.id) return;
    const tag = e.target.name;
    //console.log(`tag ${tag}`);
    
    const newValue = isActive ? "visible" : "active";
    updateTagState(tag, newValue);
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
