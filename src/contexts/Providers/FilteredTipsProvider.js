import { createContext, useContext } from 'react';
import { useTagsContext } from './TagsProvider';
import { useTipsContext } from './TipsProvider';
import { useSearchStringContext } from './SearchStringProvider';

function useData() {
  const {
    tags: {
      metadata: { activeTags },
    },
    tags: {
      metadata: { status },
    },
  } = useTagsContext();
  const {
    tips: { data: tips },
  } = useTipsContext();
  const { searchString } = useSearchStringContext();
  let activeTips = [];

  if (tips && status === 'loaded') {
    activeTips = getFilteredTips(tips, searchString, activeTags);
  }

  return activeTips;
}
export default function FilteredTipsProvider({ children }) {
  const data = useData();
  return <FilteredTips.Provider value={data}>{children}</FilteredTips.Provider>;
}
const FilteredTips = createContext();

export const useFilteredTipsContext = () => useContext(FilteredTips); // custom hook

function checkTagVisible(activeTags, tipTags) {
  let returnBoolean = false;
  tipTags.forEach((tag) => {
    if (activeTags.has(tag)) returnBoolean = true;
  });

  return returnBoolean;
}
function filterTip(tip, searchString, activeTags, stringMissing) {
  const showTitle = stringMissing ? false : testTitle(tip.title, searchString);
  const showTags = activeTags.size > 0 ? checkTagVisible(activeTags, tip.tags) : false;

  return showTitle || showTags;
}
function testTitle(title, searchString) {
  const searchArray = searchString.split(' ');
  const lowerCaseTitle = title.toLowerCase();
  const testResult = searchArray.every((word) => lowerCaseTitle.includes(word.toLowerCase()));
  return testResult;
}
function getFilteredTips(tips, searchString, activeTags) {
  const stringMissing = !searchString || searchString.length < 1;
  const tagsMissing = activeTags.size === 0;
  if (stringMissing && tagsMissing) return Object.values(tips);

  return Object.values(tips).filter((tip) =>
    filterTip(tip, searchString, activeTags, stringMissing)
  );
}
