import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { useTagsContext } from "./TagsProvider";
import { useTipsContext } from "./TipsProvider";
function useData() {
  const [loadState, setLoadState] = useState(() => "awaitingData");
  const tags = useTagsContext();
  const { tips } = useTipsContext();
  const [searchString, setSearchString] = useState(getTitleFromUrl());
  const filteredTips = [];
  const [activeTags, setActiveTags] = useState(null);
  const [activeTips, setActiveTips] = useState(null);


  useEffect(() =>{
    if (tags) {
      console.count("tags effect run");

    }
},[tags]);

  return {
    searchString, setSearchString,
    activeTips,
  };
}
export default function FilteredTipsProvider({ children }) {
  const data = useData();
  return <FilteredTips.Provider value={data}>{children}</FilteredTips.Provider>;
}
const FilteredTips = createContext();

export const useFilteredTipsContext = () => useContext(FilteredTips); // custom hook

function getTitleFromUrl() {
  const search = window.location.search;
  if (search === "") return  null;
  const searchObject = new URLSearchParams(search);
  const searchFromUrl = searchObject.get("title");
  return  searchFromUrl ;
}





function checkTagVisible(activeTags, tipTags) {
  let returnBoolean = false;
  tipTags.forEach((tag) => {
    if (activeTags.has(tag.toLowerCase())) returnBoolean = true;
  });

  return returnBoolean;
}
function filterTip(tip, searchString, tags) {
  const showTitle =
    searchString === null
      ? true
      : tip.title.toLowerCase().includes(searchString.toLowerCase());
  const showTags =
    checkTagVisible(tags, tip.tags);
  return showTitle && showTags;
}
function getFilteredTips(tips, searchString, tags) {
  return Object.values(tips).filter((tip) =>
    filterTip(tip, searchString, tags)
  );
}
