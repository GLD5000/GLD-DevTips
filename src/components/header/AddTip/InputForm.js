import InputSections from './InputSections';
import InputTags from '../../../elements/InputTags';
import InputTitle from './InputTitle';
import PreviewTip from './PreviewTip';
import PreviewButton from './PreviewButton';

export default function InputForm() {
  return (
    <div className=" mb-10 flex w-full flex-col items-center justify-items-center gap-4 px-2">
      <div className="my-5 grid grid-cols-1 gap-2">
        <InputTitle />
        <InputTags />
      </div>
      <InputSections />
      <PreviewButton />
      <PreviewTip />
    </div>
  );
}
