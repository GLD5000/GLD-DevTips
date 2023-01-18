import { useState, useEffect, createContext, useContext } from "react";
import {
  getTagsFirestore,
  getTipsFirestore,
  addTipToFirestore,
  getNewTipId,
} from "../../firestore";

function useData() {
  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [nextTipId, setNextTipId] = useState(null);
  console.count("App Data Provider");
  useEffect(() => {
    let runEffect = true;
    getTagsFirestore().then((result) => {
      if (runEffect) {
        initTags(setTags, result);
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
  async function getFirestoreData() {
    getTagsFirestore().then((result) => {
      setTags(result);
    });
    getTipsFirestore().then((result) => {
      setTips(result);
      const newTipId = getNewTipId();
      console.log(newTipId);
      setNextTipId(newTipId);
    });
  }
}

function initTags(setTags, result) {
  setTags(() => {
    const tagsObject = result;
    const tagsFromUrl = getTagArrayFromUrl();
    console.log(tagsFromUrl);
    if (tagsFromUrl !== null)
      tagsFromUrl.forEach((tagId) => {
        tagsObject[tagId].active = true;
      });
    console.log(tagsObject);

    return tagsObject;
  }
  );
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
