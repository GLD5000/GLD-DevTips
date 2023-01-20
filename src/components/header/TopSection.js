import Filters from "./Filters";
import InputForm from "./AddTip/InputForm";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
export default function TopSection() {
    const {inputForm:{metadata:{editing}}} = useInputFormContext();
  return (
    <>
      {editing && (
        <InputForm
        />
      )}
      {!editing && (
        <Filters
        />
      )}
    </>
  );
}
