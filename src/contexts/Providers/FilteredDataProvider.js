import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { getTagsFirestore, getTipsFirestore } from "../../firestore";
const url = window.location.search;
const urlObject = new URLSearchParams(url);
const searchFromUrl = urlObject.get("title");
const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());


function useData() {

  

  //Filter state: use reducer
  // active tags set
  // search string
  // active tips array?
  // Show tags


  

  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [nextTipID, setNextTipID] = useState(null);



  useEffect(() => {
    let runEffect = true;
    getTagsFirestore().then((result) => {
      if (runEffect) {
        if (tagsFromUrl.length > 0)
          // activateTagsFromArray(
          //   result,
          //   tagsFromUrl,
          //   filterActive,
          //   setFilterActive
          // );
        // console.log(result);
        setTags(result);
      }
    });
    getTipsFirestore().then((result) => {
      if (runEffect) {
        // console.log(result);
        setTips(result);
      }
    });
    return () => {
      runEffect = false;
    };
  }, []);

  function clickTag(tagId) {}
  function changeSearch(searchString) {
    // setSearchString(searchString);
  }
  function previewTip() {}
  function saveTip() {}
  function editTip() {}
  function deleteTip() {}

  return {
    // showSearch,
    // setShowSearch,
    // showFilter,
    // setshowFilter,
    // inputForm,
    // tags,
    // filterActive,
    // searchString,
    // tips,
    // setInputForm,
    // clickTag,
    // changeSearch,
    // previewTip,
    // saveTip,
    // editTip,
    // deleteTip,
  };
}
let log = true;
export default function FilteredDataProvider({ children }) {
  const data = useData();

  return <filteredData.Provider value={data}>{children}</filteredData.Provider>;
}
const filteredData = createContext();

export const useFilteredDataContext = () => useContext(filteredData); // custom hook

function activateTagsFromArray(tags, array, filterActive, setFilterActive) {
  // console.group(`array`);
  // console.log(array);
  // console.groupEnd();
  array.forEach((tagId) => {
    const key = tagId.toLowerCase();
    if (tags[key] === undefined) return;
    if (filterActive === false) setFilterActive(true);
    tags[key].active = true;
  });
  return tags;
}
