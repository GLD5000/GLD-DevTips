import { useEffect, createContext, useContext, useReducer } from "react";
import { getTagsFirestore } from "../../firestore";
import { useTipsContext } from "./TipsProvider";

function useData() {
  const tips = useTipsContext();
  const [tags, tagsDispatch] = useReducer(tagReducer, null);
  useEffect(() => {
    return fetchFirestoreData(tagsDispatch);
  }, []);

  return {
    tags,
    tagsDispatch,
  };
}

function fetchFirestoreData(tagsDispatch) {
  let runEffect = true;
  getTagsFirestore().then((result) => {
    if (runEffect) {
      initTags(tagsDispatch, result);
    }
  });
  return () => {
    runEffect = false;
  };
}

function initTags(tagsDispatch, result) {
  tagsDispatch({ type: "ACTIVATE_TAGS_FROM_URL", payload: result });
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
