import Filters from "./Filters";
import AddTip from "./AddTip/AddTip";
import { useInputFormContext } from "../../contexts/Providers/InputFormProvider";
export default function TopSection() {
    const {inputForm:{metadata:{editing}}} = useInputFormContext();
  return (
    <>
      {editing && (
        <AddTip
        />
      )}
      {editing && (
        <Filters
        />
      )}
    </>
  );
}
