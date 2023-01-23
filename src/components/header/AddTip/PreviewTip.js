import MultiTextBoxes from "../../tips/MultiTextBoxes";
import Tags from "../../tips/Tags";

import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function PreviewTip() {

  const {inputForm: {data: tip}, inputForm: {metadata: {preview}}} = useInputFormContext();
  const title = tip.title? tip.title + " (preview)": "Tip Preview";
  return (<>
  {preview &&
  (  <div className="border border-borderGrey p-2">
      <h2     className=" text-center  w-full  rounded-none rounded-t-lg border-b border-b-borderGrey hover:bg-slate-800"
>{title} </h2> 
        <>
          <MultiTextBoxes tip={tip} />
        </>
      <Tags tagArray={tip.tags} />
      {tip.updated && <p>{tip.updated}</p>}
    </div>)}
  </>
  );
}
