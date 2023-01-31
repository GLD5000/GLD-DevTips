function InputText({
  placeholder = 'Type here...',
  onInput,
  type = 'text',
  listId = null,
  value = '',
}) {
  const handler = (e) => {
    onInput(e.target.value);
  };

  return (
    <input
      className="h-8 w-full rounded border border-zinc-600 bg-inherit p-1"
      type={type}
      onFocus={(e) => e.target.select()}
      onChange={handler}
      placeholder={placeholder}
      list={listId}
      autoComplete="off"
      value={value}
    />
  );
}

export default InputText;
