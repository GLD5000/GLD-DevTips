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

  

  //data state: useReducer
  //tags object
  // tips object
  //next tip ID
  
  //Filter state: use reducer
  // active tags set
  // search string
  // active tips array?
  // Show tags

  //Edit state: useState
  // input form pointer
  // top section

  

  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [nextTipID, setNextTipID] = useState(null);


  // const [{filterActive,
  //   searchString,
  //   showSearch,
  //   showFilter,
  //   inputFormPointer,
  //   tags,
  //   tips,         },dispatch] = useReducer(dataReducer, {});

  useEffect(() => {
    let runEffect = true;
    getTagsFirestore().then((result) => {
      if (runEffect) {
        if (tagsFromUrl.length > 0)
          activateTagsFromArray(
            result,
            tagsFromUrl,
            filterActive,
            setFilterActive
          );
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
    setSearchString(searchString);
  }
  function previewTip() {}
  function saveTip() {}
  function editTip() {}
  function deleteTip() {}

  return {
    showSearch,
    setShowSearch,
    showFilter,
    setshowFilter,
    inputForm,
    tags,
    filterActive,
    searchString,
    tips,
    setInputForm,
    clickTag,
    changeSearch,
    previewTip,
    saveTip,
    editTip,
    deleteTip,
  };
}
let log = true;
export default function DataProvider({ children }) {
  const data = useData();
  // useEffect(() => {
  if (log === true && data.tags !== null) {
    console.table(
      "filterActive",
      data.filterActive,
      "searchString",
      data.searchString,
      "uiMode",
      data.uiMode,
      "inputForm",
      data.inputForm,
      "tags",
      data.tags,
      "tips",
      data.tips
    );
    log = false;
  }
  console.count("dataContext.Provider");
  // },[])

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
const dataContext = createContext({
  tags: null,
  tips: null,
  saveTip: async () => {},
  deleteTip: async () => {},
});

export const useDataContext = () => useContext(dataContext); // custom hook

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
