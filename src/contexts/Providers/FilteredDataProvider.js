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
    initFiltersFromUrl(tags, setActiveTags, setSearchString);
    console.log("Function run");
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
  console.log(data);
  return <filteredData.Provider value={data}>{children}</filteredData.Provider>;
}
const filteredData = createContext();

export const useFilteredDataContext = () => useContext(filteredData); // custom hook

function initFiltersFromUrl(tags, setActiveTags, setSearchString){
  const url = window.location.search;
  const urlObject = new URLSearchParams(url);
  const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());
  const searchFromUrl = urlObject.get("title");

  if (searchFromUrl) setSearchString(searchFromUrl);
  if (tagsFromUrl.length > 0) setActiveTags(activateTagsFromArray(tags, tagsFromUrl))
}

function activateTagsFromArray(tags, array) {

  const returnSet = new Set(array.reduce((returnArray, tagId) => {
    if (tags[tagId] === undefined) return returnArray;
    returnArray.push(tags[tagId])
    return returnArray;
  },[]));
  return returnSet;
}
