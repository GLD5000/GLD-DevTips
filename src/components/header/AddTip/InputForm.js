import { useState } from 'react';
import InputSections from './InputSections';
import InputTags from '../../../elements/InputTags';
import InputTitle from './InputTitle';
import PreviewTip from './PreviewTip';
import InputTabs from './InputTabs';
// import PreviewButton from './PreviewButton';

function returnTab(tab) {
  if (tab === 'set-tags')
    return (
      <>
        <InputTitle />
        <InputTags />
      </>
    );
  if (tab === 'write-sections') return <InputSections />;
  return <PreviewTip />;
}
export default function InputForm() {
  const [tab, setTab] = useState('set-tags');
  const tabToReturn = returnTab(tab);
  return (
    <div className=" mb-10 flex w-full flex-col items-center justify-items-center gap-4">
      <InputTabs setTab={setTab} tab={tab} />
      {tabToReturn}
    </div>
  );
}
