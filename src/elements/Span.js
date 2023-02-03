export default function Span({ content, type }) {
  const string = type === 'double' ? `"${content}"` : content;
  return <span className="mx-1 bg-slate-200 p-1 text-neutral-900">{string}</span>;
}
