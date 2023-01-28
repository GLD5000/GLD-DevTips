import MultiTextBoxes from "../../tips/MultiTextBoxes";
import Tags from "../../tips/Tags";

import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function PreviewTip() {
  const {
    inputForm: { data: tip },
    inputForm: {
      metadata: { preview },
    },
  } = useInputFormContext();
  const title = tip.title ? tip.title + " (preview)" : "Tip Preview";
  return (
    <div className="relative ">
      {preview && (
        <div className="border border-zinc-600 p-2 w-full flex flex-col gap-2 relative">
          <h2 className=" w-full rounded-none rounded-t-lg border-b border-b-borderGrey text-center hover:bg-slate-800">
            {title}{" "}
          </h2>
            <MultiTextBoxes tip={tip} />
          <Tags tagArray={tip.tags} />
          {tip.updated && <p>{tip.updated}</p>}
        </div>
      )}
    </div>
  );
}
