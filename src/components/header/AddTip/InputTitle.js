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
    <label className="sticky top-16 grid bg-neutral-800 pb-2">
      <h3>Tip No. {id}:</h3>

      <input
        className=" h-8 w-full rounded-none bg-neutral-700 px-2 py-5 text-center text-3xl"
        type="text"
        placeholder=" Add a title or topic for your tip..."
        onChange={(e) => handler(e)}
        autoComplete="off"
        defaultValue={title}
      />
    </label>
  );
}
