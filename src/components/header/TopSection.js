import Filters from './Filters';
import InputForm from './AddTip/InputForm';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
export default function TopSection() {
  const {
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();
  return (
    <div
      id="top-section"
      className="w-body min-w-body max-w-body rounded border bg-neutral-800 py-1 px-2"
    >
      {editing && <InputForm />}
      {!editing && <Filters />}
    </div>
  );
}
