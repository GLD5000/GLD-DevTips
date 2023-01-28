import InputSections from "./InputSections";
import InputTags from "../../../elements/InputTags";
import InputTitle from "./InputTitle";
import SaveButtons from "./SaveButtons";
import PreviewTip from "./PreviewTip";

export default function InputForm() {
  return (
    <div className=" mb-10 flex flex-col justify-items-center w-full gap-4">
      <div className="my-5 grid grid-cols-1 gap-2">
        <label className="grid">
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
