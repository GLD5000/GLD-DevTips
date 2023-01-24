import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

export default function InputTitle() {
  const {
    inputForm: {
      data: { title },
      data: { id },
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
    <>
              <h2>Tip No. {id}</h2>

    <input
      className="w-full h-8 p-1"
      type="text"
      placeholder=" Add a title or topic for your tip..."
      onChange={(e) => handler(e)}
      autoComplete="off"
      defaultValue={title}
      ></input>
      </>
  );
}
