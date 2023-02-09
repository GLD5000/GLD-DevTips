import SvgButton from '../../elements/SvgButton';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
import { useTagsContext } from '../../contexts/Providers/TagsProvider';

const writeClasses =
  ' focus:bg-aquamarine focus:text-black hover:bg-aquamarine hover:text-black text-aquamarine bg-transparent border border-current h-full';
const cancelClasses =
  'bg-transparent text-pink-300 focus:bg-pink-300 focus:text-black hover:bg-pink-300 hover:text-black h-full';

export default function CreateButton() {
  const { dispatchTags } = useTagsContext();
  const {
    dispatchInputForm,
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();
  function onCreate() {
    if (editing === true) {
      onClose();
      return;
    }
    dispatchTags({ type: 'CLEAR_TAGS' });
    dispatchInputForm({ type: 'NEW_TIP' });
  }
  function onClose() {
    dispatchInputForm({ type: 'CANCEL_TIP' });
  }
  const AddTipText = editing ? 'Cancel' : 'Create';
  const type = editing ? 'cancelWrite' : 'add';
  return (
    <div className="width-fit col-start-4 h-full">
      <SvgButton
        wide="false"
        type={type}
        text={AddTipText}
        clickFunction={onCreate}
        reverse
        buttonClasses={editing ? cancelClasses : writeClasses}
        activeClasses="active:bg-slate-400 grid-cols-autoFr "
      />
    </div>
  );
}
