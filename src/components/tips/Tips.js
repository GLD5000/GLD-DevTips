import Tip from "./Tip";
import {useFilteredTipsContext} from "../../contexts/Providers/FilteredTipsProvider"
const Tips = ({ tipList, setTagStateFromTip, editTip, showAddTipForm }) => {
  const tips = useFilteredTipsContext();
  return (
    <>
      {tips.map((tip) => (
        <Tip
          key={tip.id}
          tip={tip}
          setTagStateFromTip={setTagStateFromTip}
          editTip={editTip}
          showAddTipForm={showAddTipForm}
        />
      ))}
    </>
  );
};

export default Tips;
