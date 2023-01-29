export default function CodeSpan({ content }) {
  return (
    <code className="span h-fit overflow-x-auto whitespace-pre rounded bg-black  p-1 font-mono text-vsGreen placeholder:text-vsGreen">
      {content}
    </code>
  );
}
