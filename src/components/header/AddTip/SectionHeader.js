import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function SectionHeader({ index: key }) {
  const {
    inputForm: {
      data: {
        sections: {
          [key]: { title },
        },
      },
    },
    dispatchInputForm,
  } = useInputFormContext();

  const handler = (e) => {
    const { value: targetValue } = e.target;
    const index = e.target.name;
    dispatchInputForm({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: { index, value: targetValue, field: 'title' },
    });
  };

  const placeholder = 'Add optional title...';

  return (
    <div className="flex w-full items-center overflow-x-auto rounded-none border-t-2 bg-neutral-800 pt-4 pb-2 text-left text-xl">
      <label className=" flex h-8 w-full gap-2 whitespace-nowrap rounded-none bg-neutral-700 pl-2 pr-1 text-left text-2xl">
        {`Section ${key + 1}:`}
        <input
          className=" h-8 w-full rounded-none border-none bg-transparent text-center text-2xl"
          type="text"
          onChange={(e) => handler(e)}
          placeholder={placeholder}
          name={key}
          autoComplete="off"
          value={title}
        />
      </label>
    </div>
  );
}
