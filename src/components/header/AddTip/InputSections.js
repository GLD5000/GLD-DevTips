import SectionField from './SectionField';
import SectionHeader from './SectionHeader';
import SectionTextTools from './SectionTextTools';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';
import SectionControls from './SectionControls';

export default function InputSections() {
  const {
    inputForm: {
      data: { sections, title },
    },
    dispatchInputForm,
  } = useInputFormContext();

  function makeInputArray() {
    return (
      <div className="w-full px-2">
        {sections.map((object, index) => {
          const key = index;
          const returnObject = (
            <div key={`${key}field-container`} className="flex w-full flex-col items-center gap-2">
              <h2>{title}</h2>
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
      </div>
    );
  }
  const inputArray = makeInputArray();

  return inputArray;
}
