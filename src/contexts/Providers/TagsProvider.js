import { useEffect, createContext, useContext, useReducer } from "react";
import { getTagsFirestore } from "../../firestore";
import { useTipsContext } from "./TipsProvider";
import makeNewTag from "../../utilities/newTagMaker"

function useData() {
  const { tips, dispatchTips } = useTipsContext();
  const [tags, dispatchTags] = useReducer(tagReducer, null);
  useEffect(() => {
    return fetchFirestoreData(dispatchTags);
  }, []);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const status = tips.metadata.status;
      if (status === "fetched") {
        dispatchTags({ type: "COUNT_TAGS", payload: tips.data });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [tips, dispatchTips]);
  return {
    tags,
    dispatchTags,
  };
}

function fetchFirestoreData(dispatchTags) {
  let isMounted = true;
  getTagsFirestore().then((result) => {
    if (isMounted) {
      initTags(dispatchTags, result);
    }
  });
  return () => {
    isMounted = false;
  };
}

function initTags(dispatchTags, result) {
  dispatchTags({ type: "ACTIVATE_TAGS_FROM_URL", payload: result });
}

export default function TagsProvider({ children }) {
  const data = useData();
  console.group(`data`);
  console.log(data);
  console.groupEnd();
  return <TagContext.Provider value={data}>{children}</TagContext.Provider>;
}
const TagContext = createContext();

export const useTagsContext = () => useContext(TagContext);

function getTagArrayFromUrl() {
  const search = window.location.search;
  if (search === "") return [];
  const searchObject = new URLSearchParams(search);
  const tags = searchObject.getAll("tags");
  const tagsFromUrl =
    tags.length === 0
      ? null
      : searchObject.getAll("tags").map((x) => x.toLowerCase());
  return tagsFromUrl;
}

function tagReducer(state, action) {
  const oldTagsCopy = { ...state };
  switch (action.type) {
    case "ACTIVATE_TAGS_FROM_URL": {
      const tagArrayFromUrl = getTagArrayFromUrl();
      if (tagArrayFromUrl.length > 0)
        tagArrayFromUrl.forEach((tagId) => {
          action.payload[tagId].active = true;
        });
      return action.payload;
    }
    case "COUNT_TAGS": {
      // const tagsArray = Object.values(action.payload).reduce((array, tip) => {
      //   return array.concat(...tip.tags);
      // }, []);
      // const tagsArray = Object.values(action.payload).flatMap(x => x.tags);
      // console.log(tagsArray);
      const tagsCount = Object.values(action.payload).flatMap(x => x.tags).reduce((acc, curr)=>{
        acc[curr] = acc[curr]? acc[curr] + 1: 1;
        return acc;},{});
      Object.keys(tagsCount).forEach(tagName => {
        const tagId = tagName.toLowerCase();
        if (oldTagsCopy[tagId] === undefined) oldTagsCopy[tagId] = makeNewTag(tagName);
        oldTagsCopy[tagId].count = tagsCount[tagName];
            });
      // console.log(tagsCount);
      // tagsArray.forEach(tagName => {
      //   const tagId = tagName.toLowerCase();
      //   if (oldTagsCopy[tagId] === undefined) oldTagsCopy[tagId] = makeNewTag(tagName);
      //   const countUndefined = oldTagsCopy[tagId].count === undefined;
      //   oldTagsCopy[tagId].count = countUndefined? 1:  oldTagsCopy[tagId].count + 1; 
      // });
      return oldTagsCopy;
    }
    case "REPLACE_TAGS": {
      console.log(action.payload);
      return action.payload;
    }
    case "CLEAR_TAGS": {
      Object.values(oldTagsCopy).forEach((oldTag) => {
        oldTag.active = false;
      });
      return oldTagsCopy;
    }
    case "ACTIVATE_TAGS": {
      action.payload.forEach((tagId) => {
        oldTagsCopy[tagId].active = true;
      });
      return oldTagsCopy;
    }
    case "TOGGLE_TAG":
    default: {
      oldTagsCopy[action.payload].active = !oldTagsCopy[action.payload].active;
      return oldTagsCopy;
    }
  }
}
