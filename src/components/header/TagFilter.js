import ToggleButton from '../../elements/ToggleButton';
export default function TagFilter({ tag, handleClickTag, activeTags }) {
  const { backgroundColour, textColour, name, count } = tag;
  const active = activeTags.has(name);
  function tagOnClick(e) {
    const tagName = e.target.name;
    if (tagName !== undefined) handleClickTag({ name: tagName, active: !activeTags.has(tagName) });
  }
  const ButtonClasses = ` border-1 flex rounded hover:border-current py-1 px-2 tag-filter-btn`;

  return (
    <ToggleButton
      name={name}
      id={name + 'filterButton'}
      color={textColour}
      backgroundColor={backgroundColour}
      text={`${name} (${count})`}
      clickFunction={tagOnClick}
      className={ButtonClasses}
      toggle={active}
    />
  );
}
