export default function Link({ content }) {
  function processLinkContent(content) {
    const splitTextLink = content.split("](");
    const text = splitTextLink[0].slice(1);
    const link = splitTextLink[1].slice(0, splitTextLink[1].length - 1);
    return { link, text };
  }
  const { link, text } = processLinkContent(content);

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}
