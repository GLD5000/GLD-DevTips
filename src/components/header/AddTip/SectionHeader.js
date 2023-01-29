import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function SectionHeader({ index }) {
  const {
    inputForm: {
      data: {
        sections: {
          [index]: { title },
        },
      },
    },
  } = useInputFormContext();
  return <h2 className=" w-full text-center">{title || `Section ${index + 1} Title`}</h2>;
}
