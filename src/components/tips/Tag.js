import TagButton from "../../elements/TagButton";

export default function Tag ({ tag, handleClickTag}) {
  const { backgroundColour, textColour, active, name} = tag;

  function tagOnClick(e) {
    const name = e.target.name;

    if (name !== undefined) handleClickTag({ name: name, active: !active });
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

