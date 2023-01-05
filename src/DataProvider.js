import { useState, useEffect, createContext, useContext } from "react";
import { getTagsFirestore, getTipsFirestore} from "./firestore";
const url = window.location.search;
const urlObject = new URLSearchParams(url);
const searchFromUrl = urlObject.get("title");
const tagsFromUrl = urlObject.getAll("tags").map((x) => x.toLowerCase());
function activateTagsFromArray(tags, array){
  console.group(`array`);
  console.log(array);
  console.groupEnd();
  array.forEach(tagId => tags[tagId.toLowerCase()].active = true);
  return tags;
}

function useData() {
  const [uiMode, setUiMode] = useState(() => {
    return { edit: false, tags: false };
  });
  const [filters, setFilter] = useState(() => {
      return { active: false, searchString: searchFromUrl || "" };
    });
  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [inputForm, setInputForm] = useState(null);


  useEffect(() => {
    let runEffect = true;
    getTagsFirestore().then((result) => {
      if (runEffect) {
        if (tagsFromUrl.length > 0) activateTagsFromArray(result, tagsFromUrl);
        console.log(result);
        setTags(result);
      }
    });
    getTipsFirestore().then((result) => {
      if (runEffect) {
        console.log(result);
        setTips(result);
      }
    });
    return () => {
      runEffect = false;
    };
  }, []);

  function tagClick(tagId){}
  function searchChange(searchString){
    setFilter((stateObject) => {
      return {...stateObject, searchString: searchString};

    });
  }
  function previewTip(){}
  function saveTip(){}
  function editTip(){}
  function deleteTip(){}


  return {
    uiMode, //edit: true, tags: true
    inputForm,
    tags,
    filters,
    tips,
    setUiMode,
    tagClick,
    searchChange,
    previewTip,
    saveTip,
    editTip,
    deleteTip,
  };
}

export default function DataProvider({ children }) {
  const data = useData();

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
const dataContext = createContext({
  // shape of context
  uiMode: null, //edit: true, tags: true
  tags: null,
  filters: null,
  tips: null,
  inputForm: null,
  tagClick: async () => {},
  searchChange: async () => {},
  previewTip: async () => {},
  saveTip: async () => {},
  editTip: async () => {},
  deleteTip: async () => {},
});

export const useDataContext = () => useContext(dataContext); // custom hook
