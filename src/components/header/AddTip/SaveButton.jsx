import Button from '../../../elements/Button';
import { useAuthContext } from '../../../auth';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';
import { useTipsContext } from '../../../contexts/Providers/TipsProvider';
import formattedDate from '../../../utilities/formattedDate';
import { useSearchStringContext } from '../../../contexts/Providers/SearchStringProvider';

export default function SaveButton() {
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
  const conditionalClasses = isOwner
    ? 'bg-aquamarine text-black hover:border-zinc-300'
    : 'bg-transparent hover:bg-zinc-300 hover:text-black text-zinc-300';

  return (
    <Button
      key="saveTip"
      text={submitText}
      clickFunction={submitFunction}
      conditionalClasses={conditionalClasses}
      className="h-full"
    />
  );
  function getButtonData(owner, loggedIn) {
    if (!loggedIn) return ['Sign in to Save', authClickHandler];

    if (owner) return ['Save', onSubmit];

    return ['Save (Wrong User)', signedInNonOwner];
  }

  function onSubmit() {
    const date = formattedDate();
    dispatchTips({
      type: 'ADD_TIP',
      payload: { tip: { ...data, date }, date: `Saved on: ${date}` },
    });
    setSearchString(data.title);
    dispatchInputForm({ type: 'CLOSE_FORM' });
  }
  function signedInNonOwner() {
    const date = formattedDate();
    dispatchTips({
      type: 'FAKE_ADD_TIP',
      payload: { tip: { ...data, date }, date: `Saved on: ${date}` },
    });
    setSearchString(data.title);
    dispatchInputForm({ type: 'CLOSE_FORM' });
  }
}
