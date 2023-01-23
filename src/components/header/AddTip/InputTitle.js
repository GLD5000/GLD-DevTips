import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function InputTitle() {
  const {
    inputForm: {
      data: { title },
    },
    dispatchInputForm,
  } = useInputFormContext();

  const handler = (e) => {
    const value = e.target.value;
    dispatchInputForm({
      type: "REPLACE_FIELD",
      payload: { field: "title", value: value },
    });
  };

  return (
    <input
      className="titleInput"
      type="text"
      placeholder=" Add a title or topic for your tip..."
      onChange={(e) => handler(e)}
      autoComplete="off"
      defaultValue={title}
    ></input>
  );
}
