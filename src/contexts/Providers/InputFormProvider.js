import { useState, createContext, useContext } from "react";

export default function InputContextProvider({ children }) {
  const inputPointer = useData();

  return <InputContext.Provider value={inputPointer}>{children}</InputContext.Provider>;
}

function useData() {
  const [inputTip, setInputTip] = useState(null);
  const [inputPointer, setInputPointer] = useState(null);

  return {
    inputPointer,
    setInputPointer,
    inputTip, setInputTip
  };
}
const InputContext = createContext();

export function useInputContext() {
  return useContext(InputContext);
}
