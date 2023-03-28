import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function InputTitle() {
  const {
    inputForm: {
      data: { title },
      data: { id },
    },
    dispatchInputForm,
  } = useInputFormContext();

  const handler = (e) => {
    const { value } = e.target;
    dispatchInputForm({
      type: 'REPLACE_FIELD',
      payload: { field: 'title', value },
    });
  };

  return (
    <label className="grid w-full bg-neutral-800 p-2">
      <h3>Tip No. {id}:</h3>

      <input
        className=" h-8 w-full rounded-none bg-neutral-700 px-2 py-5 text-center text-3xl"
        type="text"
        placeholder=" Add title..."
        onChange={(e) => handler(e)}
        autoComplete="off"
        defaultValue={title}
      />
    </label>
  );
}
