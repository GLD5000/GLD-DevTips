import Tip from './Tip';
import { useFilteredTipsContext } from '../../contexts/Providers/FilteredTipsProvider';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';

function Tips() {
  const tips = useFilteredTipsContext();
  const {
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();
  const shouldExpand = tips.length === 1;
  return (
    <section id="tip-container" className="grid w-full grid-cols-1 justify-items-center gap-8 ">
      {!editing &&
        tips.map((tip) => (
          <Tip key={tip.id} tip={tip} updated={tip.updated} shouldExpand={shouldExpand} />
        ))}
    </section>
  );
}

export default Tips;
