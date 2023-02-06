import SectionField from './SectionField';
import SectionHeader from './SectionHeader';
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
    return (
      <>
        {sections.map((object, index) => {
          const key = index;
          const returnObject = (
            <div key={`${key}field-container`} className="flex w-full flex-col items-center gap-2">
              <SectionHeader index={key} />
              <SectionTextTools type={object.type} index={key} changeValue={dispatchInputForm} />
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
        })}
      </>
    );
  }
  const inputArray = makeInputArray();

  return inputArray;
}
