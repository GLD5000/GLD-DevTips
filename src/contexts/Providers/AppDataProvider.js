import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { getTagsFirestore, getTipsFirestore } from "../../firestore";

function makeNewTipId(tips) {
  const number = 1 + getMaxIdNumber(tips);
  const paddedNumber = padIdNumber(number);
  return paddedNumber;
}
function padIdNumber(number) {
  return number.toString(10).padStart(4, "0");
}
function getMaxIdNumber(tips){
  let max = 0;
  Object.values(tips).forEach(tip => {
    const integer = parseInt(tip.id);
    if (integer > max) max = integer;
  });
  return max;
}


function useData() {
  const [tags, setTags] = useState(null);
  const [tips, setTips] = useState(null);
  const [nextTipId, setNextTipId] = useState(null);

  useEffect(() => {
    let runEffect = true;
    getTagsFirestore().then((result) => {
      if (runEffect) {
        setTags(result);
      }
    });
    getTipsFirestore().then((result) => {
      if (runEffect) {
        setTips(result);
        const newTipId = makeNewTipId(result);
        console.log(newTipId);
        setNextTipId(newTipId);
      }
    });
    return () => {
      runEffect = false;
    };
  }, []);

  function saveTip() {}
  function editTip() {}
  function deleteTip() {}

  return {
    tags,
    tips,
    nextTipId,
    saveTip,
    deleteTip,
    editTip,
  };
}

export default function AppDataProvider({ children }) {
  const data = useData();

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
const dataContext = createContext();

export const useDataContext = () => useContext(dataContext);

