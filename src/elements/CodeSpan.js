export default function CodeSpan({ content }) {
  return (
    <code className="span font-mono mx-1 h-fit overflow-x-auto whitespace-pre rounded  bg-black p-1 text-vsGreen placeholder:text-vsGreen">
      {content}
    </code>
  );
}
