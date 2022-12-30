import Button from "../../elements/Button";
export default function AuthButton({ authClickHandler, signedIn }) {
  const text = signedIn ? "Sign Out" : "Log In";
  const className =
    "h-full hover:border-black hover:text-black hover:bg-whitesmoke border-solid border-current col-start-5";
  return (
    <Button
      backgroundColor="transparent"
      text={text}
      clickFunction={authClickHandler}
      className={className}
    />
  );
}
