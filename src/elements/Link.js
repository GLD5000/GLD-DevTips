function getTags(string, start, end = undefined) {
  if (string.indexOf(',') > -1) return string.slice(start, end).split(',').join('&tags=');
  return string.slice(start, end);
}
function getUrl() {
  const { href } = window.location;
  if (href.indexOf('?') > -1) return href.split('?')[0];
  return href;
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
  const gotTags = tagIndex !== false;
  const gotTitle = titleIndex !== false;
  if (gotTags || gotTitle) url += '?';

  if (gotTags)
    url += getTags(urlField, tagIndex, (titleIndex > tagIndex && titleIndex) || undefined);

  if (gotTags && gotTitle) url += '&';

  if (gotTitle) url += getTitle(urlField, titleIndex, tagIndex);

  const indexOfClosedSquareBracket = item.indexOf(']');
  const text = item.slice(0, indexOfClosedSquareBracket);
  return (
    <a className=" inline text-blue-700" href={url}>
      {text}
    </a>
  );
}
function getTitle(urlField, titleIndex, tagIndex) {
  return urlField.slice(titleIndex, (tagIndex > titleIndex && tagIndex) || undefined);
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

  return returnObject;
}
