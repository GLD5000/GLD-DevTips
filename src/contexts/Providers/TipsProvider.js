import { ActionCodeOperation } from "firebase/auth";
import { useState, useEffect, createContext, useContext, useReducer } from "react";
import {
  getTipsFirestore,
  addTipToFirestore,
  getNewTipId,
} from "../../firestore";
function tipsReducer(state, action){
  const oldStateCopy = {...state};
  switch(action.type){
    case "INITIALISE": {
      return {metadata: {status: "fetched", nextTipId: getNewTipId()}, data: action.payload};
    }
  }
}

function useData() {
  const [tips, dispatchTips] = useReducer(tipsReducer,{data: null, metadata: {status: "fetching", nextTipId: null}});
  useEffect(() => {
    fetchFirestoreData(dispatchTips);
  }, []);

  return {
    tips,
    dispatchTips
  };
  async function saveTip(tip) {
    await addTipToFirestore(tip);
    getFirestoreData().then(() => {
    });
  }
  function deleteTip(tipId) {
    alert("No no no");
    // alert to confirm
    // delete tip locally
    // delete tip on database
  }

  async function getFirestoreData(setTips) {
    getTipsFirestore().then((result) => {
      setTips(result);
    });
  }
}

function fetchFirestoreData(dispatchTips) {
  let runEffect = true;
  getTipsFirestore().then((result) => {
    if (runEffect) {
      dispatchTips({type: "INITIALISE", payload: result});
    }
  });
  return () => {
    runEffect = false;
  };
}

export default function TipsProvider({ children }) {
  const data = useData();
  return <TipsContext.Provider value={data}>{children}</TipsContext.Provider>;
}
const TipsContext = createContext();

export const  useTipsContext = () => useContext(TipsContext);
