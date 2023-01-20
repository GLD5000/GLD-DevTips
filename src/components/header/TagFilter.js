import ToggleButton from "../../elements/ToggleButton";
export default function TagFilter({ tag, handleClickTag, activeTags }) {
  const { backgroundColour, textColour, name, count } = tag;
  const tagId = name.toLowerCase();
  const active = activeTags.has(tagId)
  function tagOnClick(e) {
    const tagName = e.target.name;
    const tagId = tagName.toLowerCase();

    if (tagId !== undefined) handleClickTag({ id: tagId, active: !activeTags.has(tagId) });
  }
  const ButtonClasses = ` border-1  rounded hover:border-current py-1 px-2 tag-filter-btn`;

  return (
    <ToggleButton
      name={name}
      id={name + "filterButton"}
      color={textColour}
      backgroundColor={backgroundColour}
      text={`${name} (${count})`}
      clickFunction={tagOnClick}
      className={ButtonClasses}
      toggle={active}
    />
  );
}
