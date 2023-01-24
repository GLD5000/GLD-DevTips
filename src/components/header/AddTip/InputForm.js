import InputSections from "./InputSections";
import InputTags from "../../../elements/InputTags";
import InputTitle from "./InputTitle";
import SaveButtons from "./SaveButtons";
import PreviewTip from "./PreviewTip";

export default function InputForm() {
  return (
    <div className=" mb-10 grid justify-items-center gap-4 rounded  bg-zinc-900">
      <div className="form-control">
        <label className="label-box">
          <InputTitle />
        </label>
        <InputTags />
      </div>
      <InputSections />

      <SaveButtons />
      <PreviewTip />
    </div>
  );
}
