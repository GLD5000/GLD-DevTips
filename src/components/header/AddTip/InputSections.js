import SectionField from "./SectionField";
import SectionHeader from "./SectionHeader";
import SectionOptions from "./SectionOptions";
import SectionTextTools from "./SectionTextTools";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";
import SectionControls from "./SectionControls";
export default function InputSections() {
  const {
    inputForm: {
      data: { sections },
    },
    dispatchInputForm,
  } = useInputFormContext();

  function makeInputArray() {
    return sections.map((object, index) => {
      const returnObject = (
        <div
          key={index + "field-container"}
          className="flex w-full flex-col gap-2"
        >
          <SectionHeader index={index} />
          <SectionOptions
            key={index + "SectionOptions"}
            type={object.type}
            index={index}
            changeValue={dispatchInputForm}
            title={object.title}
          />
          <SectionTextTools type={object.type} index={index} />
          <SectionField
            key={index + "SectionField"}
            id={index + "-SectionField"}
            name={index}
            type={object.type}
            value={object.content}
            changeText={dispatchInputForm}
          />
          <SectionControls index={index} />
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
