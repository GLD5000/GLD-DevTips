import SectionField from './SectionField';
import SectionHeader from './SectionHeader';
import SectionOptions from './SectionOptions';
import SectionTextTools from './SectionTextTools';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';
import SectionControls from './SectionControls';

export default function InputSections() {
  const {
    inputForm: {
      data: { sections },
    },
    dispatchInputForm,
  } = useInputFormContext();

  function makeInputArray() {
    return sections.map((object, index) => {
      const key = index;
      const returnObject = (
        <div key={`${key}field-container`} className="flex w-full flex-col gap-2">
          <SectionHeader index={key} />
          <SectionOptions
            key={`${key}SectionOptions`}
            type={object.type}
            index={key}
            changeValue={dispatchInputForm}
            title={object.title}
          />
          <SectionTextTools type={object.type} index={key} />
          <SectionField
            key={`${key}SectionField`}
            id={`${key}-SectionField`}
            name={key}
            objectType={object.type}
            content={object.content}
            changeText={dispatchInputForm}
          />
          <SectionControls index={key} />
        </div>
      );
      return returnObject;
    });
  }
  const inputArray = makeInputArray();

  return (
    <>
      <h2>Add sections</h2>
      {inputArray}
    </>
  );
}
