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
    <label className="grid w-full p-2 dark:bg-neutral-800">
      <h3>Tip No. {id}:</h3>

      <input
        className=" h-8 w-full rounded-none bg-neutral-200 px-2 py-5 text-center text-xl placeholder:text-neutral-700 dark:bg-neutral-700 dark:placeholder:text-neutral-400"
        type="text"
        placeholder=" Add title..."
        onChange={(e) => handler(e)}
        autoComplete="off"
        defaultValue={title}
      />
    </label>
  );
}
