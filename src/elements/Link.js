function getTags(string, start, end = undefined) {
  if (string.indexOf(',') > -1) return string.slice(start, end).split(',').join('&tags=');
  return string.slice(start, end);
}
function getUrl() {
  let href = window.location.href;
  if (href.indexOf('?') > -1) href = href.split('?')[0];
  return href + '?';
}
function sliceLinkLocalUrl(item) {
  const indexOfOpenBracket = item.indexOf('(');
  const startSlice = indexOfOpenBracket + 1 || false;
  const urlField = item.slice(startSlice).replace('&', '');

  let url = getUrl();
  const titleFlag = 'title=';
  let titleIndex = urlField.indexOf(titleFlag);
  titleIndex = titleIndex > -1 && titleIndex;
  const tagsFlag = 'tags=';
  let tagIndex = urlField.indexOf(tagsFlag);
  tagIndex = tagIndex > -1 && tagIndex;
  if (tagIndex !== false)
    url += getTags(urlField, tagIndex, (titleIndex > tagIndex && titleIndex) || undefined);
  if (tagIndex !== false && titleIndex !== false) url += '&';
  if (titleIndex !== false)
    url += urlField.slice(titleIndex, (tagIndex > titleIndex && tagIndex) || undefined);

  const indexOfClosedSquareBracket = item.indexOf(']');
  const text = item.slice(0, indexOfClosedSquareBracket);

  return (
    <a className=" inline text-blue-700" href={url}>
      {text}
    </a>
  );
}
function sliceLinkSimple(item) {
  const indexOfOpenBracket = item.indexOf('(');
  const startSlice = indexOfOpenBracket + 1 || false;
  const url = item.slice(startSlice);

  const indexOfClosedSquareBracket = item.indexOf(']');
  const text = item.slice(0, indexOfClosedSquareBracket);
  return (
    <a className=" inline text-blue-700" href={url} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}

function itemHandler(item) {
  if (typeof item !== 'string') return item;
  const itemContainsLink = item.includes('http') || item.includes('www');
  if (itemContainsLink === false) return sliceLinkLocalUrl(item);
  return sliceLinkSimple(item);
}

export default function Link({ content }) {
  const returnObject = itemHandler(content);

  return <>{returnObject}</>;
}
