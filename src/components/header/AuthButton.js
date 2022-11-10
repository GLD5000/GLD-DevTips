import Button from "../../elements/Button"
export default function AuthButton({authClickHandler, signedIn}) {
  const text = signedIn? "Sign Out": "Sign In With Google";
  return (
    <Button text={text} clickFunction={authClickHandler}/>
  )
}
