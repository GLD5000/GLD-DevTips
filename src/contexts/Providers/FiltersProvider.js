import {
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

function useData() {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    searchString: null,
    activeTags: new Set(),
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
        };
      case "CLEAR_TAGS": {
        const updatedTags = new Set();
        return {
          searchString: oldSearchString,
          activeTags: updatedTags,
        };
      }
      case "TOGGLE_TAG":
      default: {
        const updatedTags = updateActiveTags(oldTags, action.payload);
        return {
          searchString: oldSearchString,
          activeTags: updatedTags,
        };
      }
      case "SET_FILTERS_FROM_URL":
        return {
          searchString: action.payload.searchFromUrl,
          activeTags: action.payload.tagsFromUrl,
        };
    }
  }
  useEffect(() =>{
    const { tagsFromUrl, searchFromUrl } = getFiltersFromUrl();
    if (tagsFromUrl || searchFromUrl) {
      // if (tagsFromUrl) validateTags(tags, tagsFromUrl);
      filterDispatch({
        type: "SET_FILTERS_FROM_URL",
        payload: { tagsFromUrl, searchFromUrl },
      });
    }  },[]);
  return {
    filterState,
    filterDispatch,
  };
}
export default function FiltersProvider({ children }) {
  const data = useData();
  console.group(`Filter data`);
  console.log(data);
  console.groupEnd();
  return <Filters.Provider value={data}>{children}</Filters.Provider>;
}
const Filters = createContext();

export const useFiltersContext = () => useContext(Filters); // custom hook

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
// function validateTags(tags, activeTags) {
//   activeTags.forEach((activeTag) => {
//     const shouldDelete = tags[activeTag] === undefined;
//     if (shouldDelete) activeTags.delete(activeTag);
//   });
// }
