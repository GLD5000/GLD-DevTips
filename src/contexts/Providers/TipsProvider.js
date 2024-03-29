import { useEffect, createContext, useContext, useReducer } from 'react';
import { getTipsFirestore, addTipToFirestore } from '../../firestore';
import { useAuthContext } from '../../auth';

function useData() {
  const { authUser } = useAuthContext();
  const isOwner = authUser?.isOwner || false;
  const [tips, dispatchTips] = useReducer(tipsReducer, {
    data: null,
    metadata: { status: 'fetching', nextTipId: -1 },
  });
  useEffect(() => {
    let run = true;
    if (run) {
      fetchFirestoreData(dispatchTips);
    }

    return () => {
      run = false;
    };
  }, []);
  return {
    tips,
    dispatchTips,
  };

  function getNewTipId(tipsObject) {
    const number = 1 + getMaxIdNumber(tipsObject);
    const paddedNumber = padIdNumber(number);
    return paddedNumber;

    function padIdNumber(input) {
      return input.toString(10).padStart(4, '0');
    }
    function getMaxIdNumber(list) {
      let max = 0;
      Object.values(list).forEach((tip) => {
        const integer = parseInt(tip.id, 10);
        if (integer > max) max = integer;
      });
      return max;
    }
  }
  function tipsReducer(state, action) {
    const oldStateCopy = { ...state };
    switch (action.type) {
      case 'INITIALISE': {
        return {
          metadata: {
            status: 'fetched',
            nextTipId: getNewTipId(action.payload),
          },
          data: action.payload,
        };
      }
      case 'ADD_TIP': {
        const { tip } = action.payload;
        const { date } = action.payload;
        if (isOwner) addTipToFirestore(tip);
        oldStateCopy.data[tip.id] = { ...tip, updated: date };

        return {
          metadata: {
            status: 'added',
            tags: action.payload,
            nextTipId: getNewTipId(oldStateCopy.data),
          },
          data: oldStateCopy.data,
        };
      }
      case 'DELETE_TIP': {
        const { tags } = oldStateCopy.data[action.payload.id];
        delete oldStateCopy.data[action.payload.id];
        return {
          metadata: {
            status: 'deleted',
            tags,
            nextTipId: getNewTipId(oldStateCopy.data),
          },
          data: oldStateCopy.data,
        };
      }
      case 'STATUS_IDLE': {
        oldStateCopy.metadata.status = 'idle';
        return oldStateCopy;
      }
      case 'FAKE_ADD_TIP':
      default: {
        const { tip } = action.payload;
        const { date } = action.payload;
        oldStateCopy.data[tip.id] = { ...tip, updated: date };

        return {
          metadata: {
            status: 'added',
            tags: action.payload.tags,
            nextTipId: getNewTipId(oldStateCopy.data),
          },
          data: oldStateCopy.data,
        };
      }
    }
  }
}

function fetchFirestoreData(dispatchTips) {
  let isMounted = true;
  const tipsLocal = window.sessionStorage.getItem('tips');
  if (tipsLocal === null) {
    getTipsFirestore().then((result) => {
      if (isMounted) {
        dispatchTips({ type: 'INITIALISE', payload: result });
      }
    });
  }
  if (tipsLocal !== null) {
    const payload = JSON.parse(tipsLocal);
    dispatchTips({ type: 'INITIALISE', payload });
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
