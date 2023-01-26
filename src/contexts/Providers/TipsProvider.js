import { useEffect, createContext, useContext, useReducer } from "react";
import { getTipsFirestore, addTipToFirestore } from "../../firestore";
import { useAuthContext } from "../../auth";

function useData() {
  const { authUser } = useAuthContext();
  let isOwner = authUser?.isOwner || false;
  console.log(isOwner);
  const [tips, dispatchTips] = useReducer(tipsReducer, {
    data: null,
    metadata: { status: "fetching", nextTipId: -1 },
  });
  useEffect(() => {
    fetchFirestoreData(dispatchTips);
  }, []);

  return {
    tips,
    dispatchTips,
  };

  function getNewTipId(tipsObject) {
    const number = 1 + getMaxIdNumber(tipsObject);
    const paddedNumber = padIdNumber(number);
    return paddedNumber;

    function padIdNumber(number) {
      return number.toString(10).padStart(4, "0");
    }
    function getMaxIdNumber(tips) {
      let max = 0;
      Object.values(tips).forEach((tip) => {
        const integer = parseInt(tip.id);
        if (integer > max) max = integer;
      });
      return max;
    }
  }
  function tipsReducer(state, action) {
    const oldStateCopy = { ...state };
    switch (action.type) {
      case "INITIALISE": {
        return {
          metadata: {
            status: "fetched",
            nextTipId: getNewTipId(action.payload),
          },
          data: action.payload,
        };
      }
      case "ADD_TIP":
      default: {
        const tip = action.payload.tip;
        const date = action.payload.date;
        if (isOwner) addTipToFirestore(tip);
        oldStateCopy.data[tip.id] = { ...tip, updated: date };

        return {
          metadata: {
            status: "added",
            tags: action.payload.tags,
            nextTipId: getNewTipId(oldStateCopy.data),
          },
          data: oldStateCopy.data,
        };
      }
      case "DELETE_TIP": {
        const tags = oldStateCopy.data[action.payload.id].tags;
        delete oldStateCopy.data[action.payload.id];
        return {
          metadata: {
            status: "deleted",
            tags: tags,
            nextTipId: getNewTipId(oldStateCopy.data),
          },
          data: oldStateCopy.data,
        };
      }
      case "STATUS_IDLE": {
        oldStateCopy.metadata.status = "idle";
        return oldStateCopy;
      }
    }
  }
}

function fetchFirestoreData(dispatchTips) {
  let isMounted = true;
  const tipsLocal = window.sessionStorage.getItem("tips");
  if (tipsLocal === null) {
    console.log("starting tip fetch");

    getTipsFirestore().then((result) => {
      if (isMounted) {
        dispatchTips({ type: "INITIALISE", payload: result });
      }
    });
  }
  if (tipsLocal !== null) {
    const payload = JSON.parse(tipsLocal);
    dispatchTips({ type: "INITIALISE", payload: payload });
  }
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
