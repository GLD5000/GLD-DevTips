import SvgButton from '../../../elements/SvgButton';
import Button from '../../../elements/Button';
import { useAuthContext } from '../../../auth';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';
import { useTipsContext } from '../../../contexts/Providers/TipsProvider';
import formattedDate from '../../../utilities/formattedDate';
import { useSearchStringContext } from '../../../contexts/Providers/SearchStringProvider';

export default function SaveButtons() {
  const {
    dispatchInputForm,
    inputForm: { data },
  } = useInputFormContext();
  const { dispatchTips } = useTipsContext();
  const { setSearchString } = useSearchStringContext();
  const appAuth = useAuthContext();
  const signedIn = appAuth.authUser !== null;
  const isOwner = signedIn === true && appAuth.authUser?.isOwner === true;
  const authClickHandler = appAuth.clickHandler;
  const [submitText, submitFunction] = getButtonData(isOwner, signedIn);

  // const submitText = isOwner ? 'Save' : signedIn ? 'Save (Wrong User)' : 'Sign in to Save';
  // const submitFunction = isOwner ? onSubmit : signedIn ? signedInNonOwner : authClickHandler;
  const conditionalClasses = isOwner
    ? 'bg-aquamarine text-black hover:border-zinc-300'
    : 'bg-transparent hover:bg-zinc-300 hover:text-black text-zinc-300';

  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-2">
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
      <Button
        key="saveTip"
        text={submitText}
        clickFunction={submitFunction}
        conditionalClasses={conditionalClasses}
      />
    </div>
  );
  function getButtonData(owner, loggedIn) {
    if (!loggedIn) return ['Sign in to Save', authClickHandler];

    if (owner) return ['Save', onSubmit];

    return ['Save (Wrong User)', signedInNonOwner];
  }

  function onSubmit() {
    // if (tips.data[data.id] !== undefined) {
    //   const text = `
    //   This will overwrite:
    //   ID: ' ${data.id} '
    //   Title: ' ${data.title} '
    //   Do you wish to continue?`;
    //   if (window.confirm(text) === false) {
    //     window.alert('You cancelled!');
    //     return;
    //   }
    // }
    const date = formattedDate();
    dispatchTips({
      type: 'ADD_TIP',
      payload: { tip: { ...data, date }, date: `Saved on: ${date}` },
    });
    setSearchString(data.title);
    dispatchInputForm({ type: 'CLOSE_FORM' });
  }
  function onPreview() {
    dispatchInputForm({ type: 'PREVIEW_TIP' });
  }
  function signedInNonOwner() {
    // if (tips.data[data.id] !== undefined) {
    //   const text = `
    //   This will overwrite:
    //   ID: ' ${data.id} '
    //   Title: ' ${data.title} '
    //   Do you wish to continue?`;
    //   if (window.confirm(text) === false) {
    //     window.alert('You cancelled!');
    //     return;
    //   }
    // }
    const date = formattedDate();
    dispatchTips({
      type: 'FAKE_ADD_TIP',
      payload: { tip: { ...data, date }, date: `Saved on: ${date}` },
    });
    setSearchString(data.title);
    dispatchInputForm({ type: 'CLOSE_FORM' });
  }
}
