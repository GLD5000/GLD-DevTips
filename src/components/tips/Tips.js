import Tip from './Tip';
import { useFilteredTipsContext } from '../../contexts/Providers/FilteredTipsProvider';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
const Tips = ({ setTagStateFromTip, editTip, showAddTipForm }) => {
  const tips = useFilteredTipsContext();
  const {
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();
  return (
    <section id="tip-container" className="grid w-full grid-cols-1 justify-items-center gap-2">
      {!editing &&
        tips.map((tip) => (
          <Tip
            key={tip.id}
            tip={tip}
            setTagStateFromTip={setTagStateFromTip}
            editTip={editTip}
            showAddTipForm={showAddTipForm}
            updated={tip.updated}
          />
        ))}
    </section>
  );
};

export default Tips;
