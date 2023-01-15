import { useState, useEffect, createContext, useContext } from "react";
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

  if (loadState === "awaitingData" && tags) setLoadState("dataReceived");
  if (loadState === "dataReceived") {
    // initFiltersFromUrl(tags, setActiveTags, setSearchString);
    const {tagsFromUrl, searchFromUrl} = getFiltersFromUrl();
    if (tagsFromUrl) setActiveTags(tagsFromUrl);
    if (tagsFromUrl || searchFromUrl) {
      const filteredTips = getFilteredTips(tips, searchFromUrl, tagsFromUrl);
      setActiveTips(filteredTips);
    }
    setLoadState("finished");
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
    searchString,
    setSearchString,
    activeTags,
    activeTips,  
  };
}
export default function FilteredDataProvider({ children }) {
  const data = useData();
  // console.log(data);
  return <filteredData.Provider value={data}>{children}</filteredData.Provider>;
}
const filteredData = createContext();

export const useFilteredDataContext = () => useContext(filteredData); // custom hook

function getFiltersFromUrl(){
  const url = window.location.search;
  if (url === "") return {tagsFromUrl: null, searchFromUrl: null};
    const urlObject = new URLSearchParams(url);
  const tags = urlObject.getAll("tags");
  const tagsFromUrl = tags.length === 0? null: new Set(urlObject.getAll("tags").map((x) => x.toLowerCase()));
  const searchFromUrl = urlObject.get("title");
  return { tagsFromUrl, searchFromUrl};
}

function initFiltersFromUrl(tags, setActiveTags, setSearchString, setActiveTips){
  const url = window.location.search;
  const urlObject = new URLSearchParams(url);
  const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());
  const searchFromUrl = urlObject.get("title");

  if (searchFromUrl) setSearchString(searchFromUrl);
  if (tagsFromUrl.length > 0) {
    setActiveTags(activateTagsFromArray(tags, tagsFromUrl))
  };
  // setActiveTips(getFilteredTips(tips, searchString, activeTags));
}

function activateTagsFromArray(tags, array) {

  const returnSet = new Set(array.reduce((returnArray, tagId) => {
    if (tags[tagId] === undefined) return returnArray;
    returnArray.push(tags[tagId])
    return returnArray;
  },[]));
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
  const showTitle = searchString === null? true: tip.title.toLowerCase().includes(searchString.toLowerCase());
  const showTags = (activeTags.size === 0)? true: checkTagVisible(activeTags, tip.tags);
  return showTitle && showTags;
}
function getFilteredTips(tips, searchString, activeTags) {
  return Object.values(tips).filter((tip) => filterTip(tip, searchString, activeTags));
}
