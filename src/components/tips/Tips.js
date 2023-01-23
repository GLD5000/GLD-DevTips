import Tip from "./Tip";
import {useFilteredTipsContext} from "../../contexts/Providers/FilteredTipsProvider"
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
const Tips = ({ setTagStateFromTip, editTip, showAddTipForm }) => {
  const tips = useFilteredTipsContext();
  const {inputForm: {metadata: {editing}}} = useInputFormContext();
  return (
    <>
      {!editing && tips.map((tip) => (
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
