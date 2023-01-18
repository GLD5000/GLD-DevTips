import { useState, useEffect, createContext, useContext, useReducer } from "react";
import {
  getTagsFirestore,
  getTipsFirestore,
  addTipToFirestore,
  getNewTipId,
} from "../../firestore";

function useData() {
  const [tags, tagsDispatch] = useReducer(tagReducer, null);
  const [tips, setTips] = useState(null);
  const [nextTipId, setNextTipId] = useState(null);
  console.count("App Data Provider");
  useEffect(() => {
    return fetchFirestoreData(tagsDispatch, setTips, setNextTipId);
  }, []);

  async function saveTip(tip) {
    await addTipToFirestore(tip);
    getFirestoreData().then(() => {
      console.log(tags, tips, nextTipId);
    });
  }
  function deleteTip(tipId) {
    alert("No no no");
    // alert to confirm
    // delete tip locally
    // delete tip on database
  }

  return {
    tags,
    tips,
    nextTipId,
    saveTip,
    deleteTip,
  };
  async function getFirestoreData(tagsDispatch, setTips) {
    getTagsFirestore().then((result) => {
      tagsDispatch({type: "INIT_TAGS", payload: result});
    });
    getTipsFirestore().then((result) => {
      setTips(result);
      const newTipId = getNewTipId();
      console.log(newTipId);
      setNextTipId(newTipId);
    });
  }
}

function fetchFirestoreData(tagsDispatch, setTips, setNextTipId) {
  let runEffect = true;
  getTagsFirestore().then((result) => {
    if (runEffect) {
      initTags(tagsDispatch, result);
    }
  });
  getTipsFirestore().then((result) => {
    if (runEffect) {
      setTips(result);
      const newTipId = getNewTipId();
      setNextTipId(newTipId);
    }
  });
  return () => {
    runEffect = false;
  };
}

function initTags(tagsDispatch, result) {
    const tagsObject = result;
    const tagsFromUrl = getTagArrayFromUrl();
    console.log(tagsFromUrl);
    if (tagsFromUrl !== null)
      tagsFromUrl.forEach((tagId) => {
        tagsObject[tagId].active = true;
      });
    console.log(tagsObject);
    tagsDispatch({type: "INIT_TAGS", payload: tagsObject});

  }

export default function AppDataProvider({ children }) {
  const data = useData();

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
const dataContext = createContext();

export const  useAppDataContext = () => useContext(dataContext);

function getTagArrayFromUrl() {
  const search = window.location.search;
  if (search === "") return null;
  const searchObject = new URLSearchParams(search);
  const tags = searchObject.getAll("tags");
  const tagsFromUrl =
    tags.length === 0
      ? null
      : searchObject.getAll("tags").map((x) => x.toLowerCase());
  return tagsFromUrl ;
}


function tagReducer(state, action) {
  const oldTagsCopy = {...state};
  switch (action.type) {
    case "INIT_TAGS":{
      console.log(action.payload);
      return action.payload;
    }
    case "CLEAR_TAGS": {
      Object.values(oldTagsCopy).forEach(oldTag => {oldTag.active = false;});
      return oldTagsCopy;
    }
    case "ACTIVATE_TAGS": {
      action.payload.forEach(tagId => {oldTagsCopy[tagId] = true;});
      return oldTagsCopy;
    }
    case "TOGGLE_TAG":
    default: {
      oldTagsCopy[action.payload] = !oldTagsCopy[action.payload];
      return oldTagsCopy;
    }
  }
}
