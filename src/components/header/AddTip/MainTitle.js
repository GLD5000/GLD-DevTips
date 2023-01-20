import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";


function defaultOnInput(value, index) {
  console.log(`No function assigned!
  Value is: ${value}
  index/name is: ${index}`);
}

export default function MainTitle ({
  placeholder = "Type here...",
  onInput = defaultOnInput,
  type = "text",
  name = undefined,
  defaultValue = "",
}) {
  const {
    inputForm: { data: {title} },
    dispatchInputForm,
  } = useInputFormContext();



  const handler = (e) => {
    const value = e.target.value;
    const index = e.target.name;
    dispatchInputForm({type: "REPLACE_TITLE", value: value});
  };


  return (
    <input
      className="titleInput"
      type="text"
      placeholder=" Add a title or topic for your tip..."
      onChange={(e) => handler(e)}
      name={name}
      autoComplete="off"
      defaultValue={title}
    ></input>
  );
};

