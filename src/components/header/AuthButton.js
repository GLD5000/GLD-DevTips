import ImageButton from '../../elements/ImageButton';
import { useAuthContext } from '../../auth';

export default function AuthButton() {
  const appAuth = useAuthContext();
  const signedIn = appAuth.authUser !== null;
  const authClickHandler = appAuth.clickHandler;
  const text = signedIn ? `Log Out ${appAuth.authUser.name}` : 'Log In';
  const imageUrl = appAuth?.authUser?.photoUrl || null;
  const className =
    'bg-transparent text-black  dark:text-zinc-300 hover:dark:text-black focus:dark:text-black  rounded h-12 w-32 hover:border-black hover:text-black hover:bg-zinc-300 focus:border-black focus:text-black focus:bg-zinc-300 border-solid border-black dark:border-zinc-300 whitespace-nowrap';
  return (
    <ImageButton
      text={text}
      clickFunction={authClickHandler}
      className={className}
      imageUrl={imageUrl}
    />
  );
}
