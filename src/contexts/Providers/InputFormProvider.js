import { useState, createContext, useContext } from "react";

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

  return {
    inputPointer,
    setInputPointer,
    inputTip,
    setInputTip,
  };
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
