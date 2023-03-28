import MultiTextBoxes from '../../tips/MultiTextBoxes';
import Tags from '../../tips/Tags';

import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function PreviewTip() {
  const {
    inputForm: { data: tip },
  } = useInputFormContext();
  const title = tip.title ? `${tip.title} (preview)` : 'Tip Preview';
  const tipHasSections = tip.sections.length > 1 || tip.sections[0].content.length > 0;
  return (
    <div className="relative w-full px-2">
      <div className="relative flex w-full flex-col gap-2 border border-zinc-600">
        <h2 className=" w-full rounded-none rounded-t-lg border-b border-b-neutral-600 px-2 text-center">
          {title}
        </h2>
        {tipHasSections ? (
          <MultiTextBoxes tip={tip} />
        ) : (
          <em className="mx-auto">Preview Will Appear Here...</em>
        )}

        <Tags tagArray={tip.tags} />
        {tip.updated && <p>{tip.updated}</p>}
      </div>
    </div>
  );
}
