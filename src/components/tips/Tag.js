import TagButton from "../../elements/TagButton";

export default function Tag ({ tag, handleClickTag}) {
  const { backgroundColour, textColour, active, name} = tag;

  function tagOnClick(e) {
    const tagId = e.target.name.toLowerCase();

    if (tagId !== undefined) handleClickTag({ name: tagId, active: !active });
  }
  return (
    <TagButton
      color={textColour}
      backgroundColor={backgroundColour}
      text={name}
      name={name}
      clickFunction={tagOnClick}
    />
  );
};

