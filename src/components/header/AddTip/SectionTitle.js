function SectionTitle({
  placeholder = 'Type here...',
  onInput,
  type = 'text',
  name = undefined,
  value = '',
}) {
  const handler = (e) => {
    const { value: targetValue } = e.target;
    const index = e.target.name;
    onInput({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: { index, value: targetValue, field: 'title' },
    });
  };
  return (
    <input
      className="rounded border border-zinc-600 bg-inherit"
      type={type}
      onChange={(e) => handler(e)}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
      value={value}
    />
  );
}

export default SectionTitle;
