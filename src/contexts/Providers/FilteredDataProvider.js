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
  //Filter state: use reducer
  // Show tags
  const [loadState, setLoadState] = useState(() => "awaitingData");
  const tags = useTagsContext();
  const { tips } = useTipsContext();
  const [searchString, setSearchString] = useState(getTitleFromUrl());
  const [activeTags, setActiveTags] = useState(null);
  const [activeTips, setActiveTips] = useState(null);
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    searchString: getTitleFromUrl(),
    activeTags: new Set(),
    activeTips: null,
  });
  function updateActiveTags(oldTags, newTag) {
    const newTagId = newTag.toLowerCase();
    if (!oldTags || oldTags?.size === 0) return new Set([newTagId]);
    const shouldDelete = oldTags.has(newTagId);
    if (shouldDelete === true) oldTags.delete(newTagId);
    if (shouldDelete === false) oldTags.add(newTagId);
    return oldTags;
  }

  function filterReducer(state, action) {
    const oldTags = state.activeTags;
    const oldSearchString = state.searchString;
    switch (action.type) {
      case "CHANGE_SEARCH_STRING":
        return {
          searchString: action.payload,
          activeTags: state.activeTags,
          activeTips: getFilteredTips(tips, action.payload, oldTags),
        };
      case "CLEAR_TAGS": {
        const updatedTags = new Set();
        return {
          searchString: oldSearchString,
          activeTags: updatedTags,
          activeTips: getFilteredTips(tips, oldSearchString, updatedTags),
        };
      }
      case "TOGGLE_TAG":
      default: {
        const updatedTags = updateActiveTags(oldTags, action.payload);
        return {
          searchString: oldSearchString,
          activeTags: updatedTags,
          activeTips: getFilteredTips(tips, oldSearchString, updatedTags),
        };
      }
      case "SET_FILTERS_FROM_URL":
        return {
          searchString: action.payload.searchFromUrl,
          activeTags: action.payload.tagsFromUrl,
          activeTips: getFilteredTips(
            tips,
            action.payload.searchFromUrl,
            action.payload.tagsFromUrl
          ),
        };
    }
  }

  if (loadState === "awaitingData" && tags) setLoadState("dataReceived");
  if (loadState === "dataReceived") {
    const { tagsFromUrl, searchFromUrl } = getFiltersFromUrl();
    if (tagsFromUrl || searchFromUrl) {
      if (tagsFromUrl) validateTags(tags, tagsFromUrl);
      filterDispatch({
        type: "SET_FILTERS_FROM_URL",
        payload: { tagsFromUrl, searchFromUrl },
      });
    }
    setLoadState("finished");
  }
  useEffect(() =>{
    console.count("tags effect run");
    if (tags) {
      console.group(`tags`);
      console.log(tags);
      console.groupEnd();  
    }
},[tags]);

  return {
    searchString, setSearchString,
    loadState,
  };
}
export default function FilteredDataProvider({ children }) {
  const data = useData();
  console.log(data);
  return <filteredData.Provider value={data}>{children}</filteredData.Provider>;
}
const filteredData = createContext();

export const useFilteredDataContext = () => useContext(filteredData); // custom hook

function getFiltersFromUrl() {
  const url = window.location.search;
  if (url === "") return { tagsFromUrl: null, searchFromUrl: null };
  const urlObject = new URLSearchParams(url);
  const tags = urlObject.getAll("tags");
  const tagsFromUrl =
    tags.length === 0
      ? null
      : new Set(urlObject.getAll("tags").map((x) => x.toLowerCase()));
  const searchFromUrl = urlObject.get("title");
  return { tagsFromUrl, searchFromUrl };
}
function getTagArrayFromUrl() {
  const search = window.location.search;
  if (search === "") return { tagsFromUrl: null};
  const searchObject = new URLSearchParams(search);
  const tags = searchObject.getAll("tags");
  const tagsFromUrl =
    tags.length === 0
      ? null
      : searchObject.getAll("tags").map((x) => x.toLowerCase());
  return { tagsFromUrl };
}
function getTitleFromUrl() {
  const search = window.location.search;
  if (search === "") return  null;
  const searchObject = new URLSearchParams(search);
  const searchFromUrl = searchObject.get("title");
  return  searchFromUrl ;
}



function initFiltersFromUrl(
  tags,
  setActiveTags,
  setSearchString,
  setActiveTips
) {
  const url = window.location.search;
  const urlObject = new URLSearchParams(url);
  const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());
  const searchFromUrl = urlObject.get("title");

  if (searchFromUrl) setSearchString(searchFromUrl);
  if (tagsFromUrl.length > 0) {
    setActiveTags(activateTagsFromArray(tags, tagsFromUrl));
  }
  // setActiveTips(getFilteredTips(tips, searchString, activeTags));
}

function activateTagsFromArray(tags, array) {
  const returnSet = new Set(
    array.reduce((returnArray, tagId) => {
      if (tags[tagId] === undefined) return returnArray;
      returnArray.push(tags[tagId]);
      return returnArray;
    }, [])
  );
  return returnSet;
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
    searchString === null
      ? true
      : tip.title.toLowerCase().includes(searchString.toLowerCase());
  const showTags =
    activeTags.size === 0 ? true : checkTagVisible(activeTags, tip.tags);
  return showTitle && showTags;
}
function getFilteredTips(tips, searchString, activeTags) {
  return Object.values(tips).filter((tip) =>
    filterTip(tip, searchString, activeTags)
  );
}
function validateTags(tags, activeTags) {
  activeTags.forEach((activeTag) => {
    const shouldDelete = tags[activeTag] === undefined;
    if (shouldDelete) activeTags.delete(activeTag);
  });
}
