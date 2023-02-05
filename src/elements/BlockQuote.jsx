export default function BlockQuote({ content }) {
  return (
    <blockquote className="my-2 whitespace-pre-wrap border-l-8 border-x-neutral-600 bg-neutral-400 p-2 text-neutral-900">
      {content}
    </blockquote>
  );
}
