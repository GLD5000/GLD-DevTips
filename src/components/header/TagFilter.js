import ToggleButton from "../../elements/ToggleButton";
export default function TagFilter({ tag, handleClickTag, tagState }) {
  const { backgroundColour, textColour, active, name, count } = tag;
  function tagOnClick(e) {
    const tagId = e.target.name.toLowerCase();

    if (tagId !== undefined) handleClickTag({ id: tagId, active: !active });
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
