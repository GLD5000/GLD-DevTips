import TagFilter from './TagFilter';
import Button from '../../elements/Button';

export default function TagSet({ tags, dispatchTags, activeTags, tagStatus }) {
  if (tags === undefined || tagStatus !== 'loaded') return null;
  function handleClickTag(payload) {
    dispatchTags({ type: 'TOGGLE_TAG', payload });
  }
  function handleClickClear() {
    dispatchTags({ type: 'CLEAR_TAGS' });
  }
  function tagStateReducer(acc, tag) {
    // make first button a clear all
    acc.push(
      <TagFilter key={tag.name} tag={tag} handleClickTag={handleClickTag} activeTags={activeTags} />
    );
    return acc;
  }
  function makeButtonArray() {
    const values = Object.values(tags);
    if (values.length === 0) return null;
    return values.reduce(tagStateReducer, [
      <Button
        name="Clear Tags"
        id="clear-tags"
        key="clearA0"
        color="black"
        backgroundColor="IndianRed"
        text="Clear Tags"
        clickFunction={handleClickClear}
        className="rounded bg-red-400 text-sm text-black hover:border-white"
      />,
    ]);
  }
  const buttonArray = makeButtonArray();
  if (!buttonArray) return null;
  return (
    <div className="px-2">
      <h2 className="text-center text-lg">Choose Tags</h2>
      <section className="flex w-full flex-wrap items-center justify-center gap-2 p-2">
        {buttonArray && buttonArray}
      </section>
    </div>
  );
}
