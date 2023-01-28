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
              <h3>Tip No. {id}:</h3>

<input
  className=" bg-neutral-700 rounded-none  w-full h-8 px-2 py-5 text-2xl text-center"
  type="text"
      placeholder=" Add a title or topic for your tip..."
      onChange={(e) => handler(e)}
      autoComplete="off"
      defaultValue={title}
      ></input>
      </>
  );
}
