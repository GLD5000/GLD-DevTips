export default function Span({ content, type }) {
  const string = type === 'double' ? `"${content}"` : content;
  return <span className=" bg-slate-200 p-1 text-neutral-900">{string}</span>;
}
