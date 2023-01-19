import { useEffect, createContext, useContext, useReducer } from "react";
import { getTagsFirestore } from "../../firestore";
import { useTipsContext } from "./TipsProvider";
import makeNewTag from "../../utilities/newTagMaker"

function useData() {
  const { tips, dispatchTips } = useTipsContext();
  const [tags, dispatchTags] = useReducer(tagReducer, {data: null, metadata:{status: "loading", activeTags: new Set()}});
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
  const oldTagsCopy = { ...state.data };
  const oldMetaDataCopy = { ...state.metadata };
  switch (action.type) {
    case "ACTIVATE_TAGS_FROM_URL": {
      const tagArrayFromUrl = getTagArrayFromUrl();
      if (tagArrayFromUrl.length > 0)
        tagArrayFromUrl.forEach((tagId) => {
          action.payload[tagId].active = true;
          oldMetaDataCopy.activeTags.add(tagId);
        });
      return {data: action.payload, metadata: oldMetaDataCopy};
    }
    case "COUNT_TAGS": {
      const tagsCount = Object.values(action.payload).flatMap(x => x.tags).reduce((acc, curr)=>{
        acc[curr] = acc[curr]? acc[curr] + 1: 1;
        return acc;},{});
      Object.keys(tagsCount).forEach(tagName => {
        const tagId = tagName.toLowerCase();
        if (oldTagsCopy[tagId] === undefined) oldTagsCopy[tagId] = makeNewTag(tagName);
        oldTagsCopy[tagId].count = tagsCount[tagName];
            });

      Object.entries(oldTagsCopy).forEach(entry => {
        if (entry[1].count === undefined) delete oldTagsCopy[entry[0]]; 
      })
      oldMetaDataCopy.status = "loaded";
      return {data: oldTagsCopy, metadata: oldMetaDataCopy};
    }
    case "REPLACE_TAGS": {
      console.log(action.payload);
      return {data: action.payload, metadata: oldMetaDataCopy};
    }
    case "CLEAR_TAGS": {
      Object.values(oldTagsCopy).forEach((oldTag) => {
        oldTag.active = false;
      });
      oldMetaDataCopy.activeTags.clear();
      return {data: oldTagsCopy, metadata: oldMetaDataCopy};
    }
    case "ACTIVATE_TAGS": {
      action.payload.forEach((tagId) => {
        oldTagsCopy[tagId].active = true;
      });
      return {data: oldTagsCopy, metadata: oldMetaDataCopy};
    }
    case "TOGGLE_TAG":
    default: {
      oldTagsCopy[action.payload.id].active = action.payload.active;
      if (action.payload.active) oldMetaDataCopy.activeTags.add(action.payload.id);
      if (!action.payload.active) oldMetaDataCopy.activeTags.delete(action.payload.id);
      return {data: oldTagsCopy, metadata: oldMetaDataCopy};
    }
  }
}
