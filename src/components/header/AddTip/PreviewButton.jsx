import SvgButton from '../../../elements/SvgButton';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function PreviewButton() {
  const {
    dispatchInputForm,
    inputForm: {
      metadata: { preview },
    },
  } = useInputFormContext();

  return (
    <SvgButton
      type="preview"
      key="preview"
      color="text-black"
      backgroundColor="bg-mediumPurple"
      text="Preview"
      clickFunction={onPreview}
      svgClasses="stroke-1 stroke-current"
      activeClasses="active:bg-slate-400 hover:border-zinc-300"
    />
  );

  function onPreview() {
    dispatchInputForm({ type: 'PREVIEW_TIP', payload: { value: !preview } });
  }
}
