import Button from "../../elements/Button";
export default function AuthButton({ authClickHandler, signedIn }) {
  const text = signedIn ? "Sign Out" : "Log In";
  const className = "btn auth-btn";
  return (
    <Button
      backgroundColor="transparent"
      text={text}
      clickFunction={authClickHandler}
      className={className}
    />
  );
}
