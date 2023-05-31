function InputText({
  placeholder = 'Type here...',
  onInput,
  type = 'text',
  listId = null,
  value = '',
  idIn = null
}) {
  const handler = (e) => {
    onInput(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.code !== 'Enter') return;
    e.target.blur();
  };

  return (
    <input
    id={idIn}
      className="h-8 w-full rounded border border-zinc-600 bg-inherit p-1"
      type={type}
      onFocus={(e) => e.target.select()}
      onChange={handler}
      onKeyDown={handleEnter}
      placeholder={placeholder}
      list={listId}
      autoComplete="off"
      value={value}
    />
  );
}

export default InputText;
