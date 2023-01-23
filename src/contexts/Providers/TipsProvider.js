import { useEffect, createContext, useContext, useReducer } from "react";
import {
  getTipsFirestore,
  addTipToFirestore,
  getNewTipId,
} from "../../firestore";
function tipsReducer(state, action) {
  const oldStateCopy = { ...state };
  switch (action.type) {
    case "INITIALISE": {
      return {
        metadata: { status: "fetched", nextTipId: getNewTipId() },
        data: action.payload,
      };
    }
    case "ADD_TIP":
    default: {
      oldStateCopy.data[action.payload.id] = action.payload;
      addTipToFirestore(action.payload);
      return {
        metadata: {
          status: "added",
          tags: action.payload.tags,
          nextTipId: getNewTipId(),
        },
        data: oldStateCopy.data,
      };
    }
    case "DELETE_TIP": {
      const tags = oldStateCopy.data[action.payload.id].tags;
      delete oldStateCopy.data[action.payload.id];
      return {
        metadata: { status: "deleted", tags: tags, nextTipId: getNewTipId() },
        data: oldStateCopy.data,
      };
    }
    case "STATUS_IDLE": {
      oldStateCopy.metadata.status = "idle";
      return oldStateCopy;
    }
  }
}

function useData() {
  const [tips, dispatchTips] = useReducer(tipsReducer, {
    data: null,
    metadata: { status: "fetching", nextTipId: null },
  });
  useEffect(() => {
    fetchFirestoreData(dispatchTips);
  }, []);

  return {
    tips,
    dispatchTips,
  };
}

function fetchFirestoreData(dispatchTips) {
  let isMounted = true;
  const tipsLocal = window.sessionStorage.getItem("tips");
  if (tipsLocal === null) {
    console.log("starting tip fetch");

    getTipsFirestore().then((result) => {
      if (isMounted) {
        dispatchTips({ type: "INITIALISE", payload: result });
        window.sessionStorage.removeItem("tips");
        window.sessionStorage.setItem("tips", JSON.stringify(result));

      }
    });
  }
  const payload = JSON.parse(tipsLocal);
  dispatchTips({ type: "INITIALISE", payload: payload });
  return () => {
    isMounted = false;
  };
}

export default function TipsProvider({ children }) {
  const data = useData();
  return <TipsContext.Provider value={data}>{children}</TipsContext.Provider>;
}
const TipsContext = createContext();

export const useTipsContext = () => useContext(TipsContext);
