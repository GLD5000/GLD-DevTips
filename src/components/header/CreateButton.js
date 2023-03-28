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
    <SvgButton
      wide="false"
      type={type}
      text={AddTipText}
      clickFunction={onCreate}
      buttonClasses={editing ? cancelClasses : writeClasses}
      activeClasses="active:bg-slate-400 h-12 w-32 grid-cols-autoFr "
    />
  );
}
