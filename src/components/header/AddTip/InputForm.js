import InputSections from "./InputSections";
import InputTags from "../../../elements/InputTags";
import InputTitle from "./InputTitle";
import SaveButtons from "./SaveButtons";
import PreviewTip from "./PreviewTip";

export default function InputForm() {
  return (
    <div className=" mb-10 grid w-body min-w-body max-w-body justify-items-center gap-4 border border-zinc-600 rounded p-2 bg-zinc-900">
      <div className="form-control">
        <label className="label-box">
          <h2>Add Title</h2>
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
