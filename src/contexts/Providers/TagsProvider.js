import { useEffect, createContext, useContext, useReducer } from 'react';
import { getTagsFirestore, addTagToFirestore } from '../../firestore';
import { useTipsContext } from './TipsProvider';
import { useAuthContext } from '../../auth';
import makeNewTag from '../../utilities/newTagMaker';

function useData() {
  const { authUser } = useAuthContext();
  const isOwner = authUser?.isOwner || false;
  const { tips, dispatchTips } = useTipsContext();
  const [tags, dispatchTags] = useReducer(tagReducer, {
    data: null,
    metadata: { showTags: true, status: 'loading', activeTags: new Set() },
  });
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchFirestoreData(dispatchTags);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const { status } = tips.metadata;
      if (status === 'fetched' || status === 'added') {
        dispatchTags({ type: 'COUNT_TAGS', payload: tips.data });
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
  function tagReducer(state, action) {
    const oldDataCopy = { ...state.data };
    const oldMetaDataCopy = { ...state.metadata };
    switch (action.type) {
      case 'ACTIVATE_TAGS_FROM_URL': {
        const tagArrayFromUrl = getTagArrayFromUrl();
        if (tagArrayFromUrl.length > 0)
          tagArrayFromUrl.forEach((tagId) => {
            if (action.payload[tagId]) {
              oldMetaDataCopy.activeTags.add(action.payload[tagId].name);
            }
          });
        return { data: action.payload, metadata: oldMetaDataCopy };
      }
      case 'COUNT_TAGS': {
        Object.keys(oldDataCopy).forEach((key) => {
          oldDataCopy[key].count = undefined;
        });
        const tagsCount = Object.values(action.payload)
          .flatMap((x) => x.tags)
          .reduce((acc, curr) => {
            acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
            return acc;
          }, {});
        Object.keys(tagsCount).forEach((tagName) => {
          const tagId = tagName.toLowerCase();
          AddTagToDbConditionally(tagId, tagName);
          oldDataCopy[tagId].count = tagsCount[tagName];
        });

        Object.entries(oldDataCopy).forEach((entry) => {
          if (entry[1].count === undefined) delete oldDataCopy[entry[0]];
        });
        oldMetaDataCopy.status = 'loaded';
        return { data: oldDataCopy, metadata: oldMetaDataCopy };
      }
      case 'REPLACE_TAGS': {
        return { data: action.payload, metadata: oldMetaDataCopy };
      }
      case 'TOGGLE_SHOW_TAGS': {
        oldMetaDataCopy.showTags = action.payload;
        return { data: oldDataCopy, metadata: oldMetaDataCopy };
      }
      case 'CLEAR_TAGS': {
        oldMetaDataCopy.activeTags.clear();
        return { data: oldDataCopy, metadata: oldMetaDataCopy };
      }
      case 'TOGGLE_TAG':
      default: {
        if (action.payload.active) oldMetaDataCopy.activeTags.add(action.payload.name);
        if (!action.payload.active) oldMetaDataCopy.activeTags.delete(action.payload.name);
        return { data: oldDataCopy, metadata: oldMetaDataCopy };
      }
    }

    function AddTagToDbConditionally(tagId, tagName) {
      if (oldDataCopy[tagId] === undefined) {
        oldDataCopy[tagId] = makeNewTag(tagName);
        if (isOwner) addTagToFirestore(tagId, oldDataCopy[tagId]);
      }
    }
  }
}

function fetchFirestoreData(dispatchTags) {
  let isMounted = true;
  const tagsLocal = window.sessionStorage.getItem('tags');
  if (tagsLocal === null) {
    getTagsFirestore().then((result) => {
      if (isMounted) {
        initTags(dispatchTags, result);
      }
    });
  }
  if (tagsLocal !== null) {
    const payload = JSON.parse(tagsLocal);
    initTags(dispatchTags, payload);
  }
  return () => {
    isMounted = false;
  };
}

function initTags(dispatchTags, result) {
  dispatchTags({ type: 'ACTIVATE_TAGS_FROM_URL', payload: result });
}

export default function TagsProvider({ children }) {
  const data = useData();
  return <TagContext.Provider value={data}>{children}</TagContext.Provider>;
}
const TagContext = createContext();

export const useTagsContext = () => useContext(TagContext);

function getTagArrayFromUrl() {
  const { search } = window.location;
  if (search === '') return [];
  const searchObject = new URLSearchParams(search);
  const tags = searchObject.getAll('tags');
  const tagsFromUrl =
    tags.length === 0 ? [] : searchObject.getAll('tags').map((x) => x.toLowerCase());
  return tagsFromUrl;
}
