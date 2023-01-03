import Button from "../../elements/Button";
import { useAuth } from "../../auth";
export default function AuthButton() {
  const appAuth = useAuth();
  const signedIn = appAuth.authUser !== null;
  const authClickHandler = appAuth.clickHandler;
  const text = signedIn ? "Log Out " + appAuth.authUser.name : "Log In";
  const className =
    "h-full hover:border-black hover:text-black hover:bg-whitesmoke border-solid border-current col-start-5 whitespace-nowrap";
  return (
    <Button
      backgroundColor="transparent"
      text={text}
      clickFunction={authClickHandler}
      className={className}
    />
  );
}
