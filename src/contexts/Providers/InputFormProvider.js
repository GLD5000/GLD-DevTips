import { useState, createContext, useContext } from "react";

export default function InputFormProvider({ children }) {
  const data = useData();

  return <InputForm.Provider value={data}>{children}</InputForm.Provider>;
}

function useData() {
  const [data, setData] = useState(false);

  return {
    data,
    setData,
  };
}
const InputForm = createContext();

export function useInputForm() {
  return useContext(InputForm);
}
