import Filters from './Filters';
import InputForm from './AddTip/InputForm';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
import Tips from '../tips/Tips';

export default function Body() {
  const {
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();
  return (
    <main
      id="body-container"
      className=" grid h-fit w-screen flex-grow grid-rows-autoFr justify-items-center gap-8 pt-2"
    >
      <div id="top-section" className="w-body min-w-body max-w-body bg-neutral-800">
        {editing && <InputForm />}
        {!editing && <Filters />}
      </div>
      {!editing && <Tips />}
    </main>
  );
}
