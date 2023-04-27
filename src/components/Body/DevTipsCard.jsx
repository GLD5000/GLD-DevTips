import CreateButton from '../header/CreateButton';
import AuthButton from '../header/AuthButton';
import { useInputFormContext } from '../../contexts/Providers/InputFormProvider';
import SaveButton from '../header/AddTip/SaveButton';
import { useAuthContext } from '../../auth';

function getConditionalButton(user, editStatus) {
  if (editStatus) return <SaveButton />;
  if (user) return <AuthButton />;
  return null;
}

export default function DevTipsCard() {
  const {
    inputForm: {
      metadata: { editing },
    },
  } = useInputFormContext();

  const { authUser } = useAuthContext();
  const conditionalButton = getConditionalButton(authUser, editing);

  return (
    <div className="mt-16 mb-10 flex h-max flex-col">
      <div className="grid w-screen max-w-body items-center self-center py-10 sm:w-full sm:px-8">
        <div className=" mx-auto mt-10  flex h-36 w-fit flex-row overflow-clip rounded-lg border-2 border-current bg-white ">
          <h1 className="  rounded-none px-2 pb-4 pt-1 font-devTips text-6xl font-black tracking-wide text-black sm:px-4 sm:pt-2 sm:pb-8 sm:text-8xl">
            DevTips
          </h1>
        </div>
        <b className=" mx-auto mt-2 mb-20 text-center text-lg sm:text-xl">
          Tips and Tricks for Developers
        </b>
      </div>

      <div className="mx-auto flex gap-2">
        <CreateButton /> {conditionalButton}
      </div>
    </div>
  );
}
