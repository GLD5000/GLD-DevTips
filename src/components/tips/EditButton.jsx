import SvgButton from '../../elements/SvgButton';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
import { useTagsContext } from '../../contexts/Providers/TagsProvider';

export default function EditButton({ tipId }) {
  const { dispatchTags } = useTagsContext();

  const { dispatchInputForm } = useInputFormContext();
  function editTip(e) {
    dispatchTags({ type: 'CLEAR_TAGS' });
    dispatchInputForm({ type: 'EDIT_TIP', payload: e.target.id });
  }
  return (
    <SvgButton
      wide="false"
      type="write"
      key={`edit${tipId}`}
      id={tipId}
      buttonClasses="text-current bg-transparent ml-auto grid-cols-autoFr mr-2 my-2"
      text="Edit"
      clickFunction={editTip}
      svgClasses="stroke-current stroke-1 fill-none"
    />
  );
}
