import { createContext, useContext } from "react";
import { useTagsContext } from "./TagsProvider";
import { useTipsContext } from "./TipsProvider";
import { useSearchStringContext } from "./SearchStringProvider";

function useData() {
  const {

    tags: { metadata: {activeTags} },
    tags: {
      metadata: { status },
    },
  } = useTagsContext();
  const {
    tips: { data: tips },
  } = useTipsContext();
  const { searchString } = useSearchStringContext();
  let activeTips = [];

  if (activeTags && tips && status === "loaded") {
    activeTips = getFilteredTips(tips, searchString, activeTags);
  }

  return activeTips;
}
export default function FilteredTipsProvider({ children }) {
  const data = useData();
  console.group(`data`);
  console.log(data);
  console.groupEnd();
  return <FilteredTips.Provider value={data}>{children}</FilteredTips.Provider>;
}
const FilteredTips = createContext();

export const useFilteredTipsContext = () => useContext(FilteredTips); // custom hook

function getTitleFromUrl() {
  const search = window.location.search;
  if (search === "") return null;
  const searchObject = new URLSearchParams(search);
  const searchFromUrl = searchObject.get("title");
  return searchFromUrl;
}

function checkTagVisible(activeTags, tipTags) {
  let returnBoolean = false;
  tipTags.forEach((tag) => {
    if (activeTags.has(tag.toLowerCase())) returnBoolean = true;
  });

  return returnBoolean;
}
function filterTip(tip, searchString, activeTags) {
  const showTitle =
    !searchString ||
    tip.title.toLowerCase().includes(searchString.toLowerCase());
  const showTags = activeTags.size > 0 ?checkTagVisible(activeTags, tip.tags): true;
  return showTitle && showTags;
}
function getFilteredTips(tips, searchString, activeTags) {
  return Object.values(tips).filter((tip) =>
    filterTip(tip, searchString, activeTags)
  );
}
