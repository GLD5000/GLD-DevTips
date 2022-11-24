import Button from "../../elements/Button"
export default function AuthButton({authClickHandler, signedIn}) {
  const text = signedIn? "Sign Out": "Sign In With Google";
  const className = "btn auth-btn"
  return (
    <Button text={text} clickFunction={authClickHandler} className={className}/>
  )
}
