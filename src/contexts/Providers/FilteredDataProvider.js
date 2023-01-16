import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { getTagsFirestore, getTipsFirestore } from "../../firestore";
import { useAppDataContext } from "./AppDataProvider";

function useData() {
  //Filter state: use reducer
  // Show tags
  const [loadState, setLoadState] = useState(() => "awaitingData");
  const { tags, tips } = useAppDataContext();
  const [searchString, setSearchString] = useState();
  const [activeTags, setActiveTags] = useState(null);
  const [activeTips, setActiveTips] = useState(null);
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    searchString: null,
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
    }
  }

  if (loadState === "awaitingData" && tags) setLoadState("dataReceived");
  if (loadState === "dataReceived") {
    // initFiltersFromUrl(tags, setActiveTags, setSearchString);
    const { tagsFromUrl, searchFromUrl } = getFiltersFromUrl();
    if (tagsFromUrl) setActiveTags(tagsFromUrl);
    if (tagsFromUrl || searchFromUrl) {
      const filteredTips = getFilteredTips(tips, searchFromUrl, tagsFromUrl);
      setActiveTips(filteredTips);
    }
    setLoadState("finished");
  }

  function toggleTag() {
    // update title // update both
    // clear tags // replace tags
  }
  // useEffect(() => {
  //   console.log("useEffect run");

  //   if (loadState === "dataReceived") {
  //     initFiltersFromUrl(tags, setActiveTags, setSearchString);
  //     console.log("Function run");
  //     setLoadState("finished");
  //   }
  // }, [loadState]);

  // useEffect(() => {
  //   let runEffect = true;
  //   getTagsFirestore().then((result) => {
  //     if (runEffect) {
  //       if (tagsFromUrl.length > 0)
  //         // activateTagsFromArray(
  //         //   result,
  //         //   tagsFromUrl,
  //         //   filterActive,
  //         //   setFilterActive
  //         // );
  //         // console.log(result);
  //         // setTags(result);
  //     }
  //   });
  //   getTipsFirestore().then((result) => {
  //     if (runEffect) {
  //       // console.log(result);
  //       // setTips(result);
  //     }
  //   });
  //   return () => {
  //     runEffect = false;
  //   };
  // }, []);

  // function clickTag(tagId) {}
  // function changeSearch(searchString) {
  // setSearchString(searchString);
  // }
  // function previewTip() {}
  // function saveTip() {}
  // function editTip() {}
  // function deleteTip() {}

  return {
    loadState,
    filterState,
    filterDispatch,
  };
}
let run = 0;
export default function FilteredDataProvider({ children }) {
  const data = useData();
  if (run < 10 && data.loadState === "dataReceived") {
    data.filterDispatch({ type: "TOGGLE_TAG", payload: "Bash" });
    data.filterDispatch({ payload: "UI" });
    data.filterDispatch({ type: "CHANGE_SEARCH_STRING", payload: "a" });
    // data.filterDispatch({ type: "CLEAR_TAGS", payload: "suck your mum" });
    run++;
  }

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
