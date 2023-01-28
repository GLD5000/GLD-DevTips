import Filters from "./Filters";
import InputForm from "./AddTip/InputForm";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
export default function TopSection() {
    const {inputForm:{metadata:{editing}}} = useInputFormContext();
  return (
    <div id="top-section" className="py-1 px-2 w-body min-w-body max-w-body border bg-neutral-800 rounded">
      {editing && (
        <InputForm
        />
      )}
      {!editing && (
        <Filters
        />
      )}
    </div>
  );
}
