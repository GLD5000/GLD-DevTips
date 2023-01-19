import { useState, createContext, useContext, useReducer } from "react";
import { useTipsContext } from "./TipsProvider";

export default function InputFormProvider({ children }) {
    const inputPointer = useData();

  return (
    <InputFormContext.Provider value={inputPointer}>
      {children}
    </InputFormContext.Provider>
  );
}

function useData() {
  const [inputTip, setInputTip] = useState(null);
  const [inputPointer, setInputPointer] = useState(null);


  const { tips } = useTipsContext();
  const [inputForm, dispatchInputForm] = useReducer(inputFormReducer, {data: {}, metadata: {inputPointer: -1}})
  return {
    inputForm, dispatchInputForm
  };
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}

function inputFormReducer(state, action){
  const oldData = {...state.data};
  const oldMetadata = {...state.metadata};

  switch (action.type){
    case "SET_POINTER":{
      return {data: oldData, metadata: oldMetadata};
    }
  }

}