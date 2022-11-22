import Button from "../../elements/Button";
import tagHexLookup from "../../utilities/tagHex.js"
const TagFilter = ({ tag, setTagState, tagState }) => {
  const isActive = tagState[tag] === "active";
  function updateTagState(tag, newValue){
    setTagState((object) => {
      return {...object, [tag]: newValue}; // Tip return new object to trigger re-render
    });
  }


  function tagOnClick(e) {
    const tag = e.target.innerHTML;
    const newValue = isActive ? "visible" : "active";
    updateTagState(tag, newValue);
  }
  const {backgroundColour, textColour} = tagHexLookup(tag);
  const className = isActive? "btn tag-filter-btn": "btn tag-filter-btn dimmed";
  return (<>
{    isActive ? (
      <Button
        color={textColour}
        backgroundColor={backgroundColour}
        text={tag}
        clickFunction={tagOnClick}
        className={className}
      />

  ) : (
      <Button
      color={textColour}
      backgroundColor={backgroundColour}
      text={tag}
      clickFunction={tagOnClick}
      className={className}

    />

  )
}
  </>
  )
};

export default TagFilter;
