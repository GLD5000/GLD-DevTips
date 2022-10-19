import { throttle } from "../utilities/utilities";


function defaultOnInput(value){
    console.log(`No function assigned!
Value is: ${value}`);
}



const InputText = ({placeholder="Type here...", onInput=defaultOnInput, type="text" }) => {
    function clickHandler(callback, value){
        console.log(`Input Value = ${value}`);
        callback(value);
    }
  return (
    <input type={type} onFocus={e => e.target.select()} onChange={e => clickHandler(onInput, e.target.value)} placeholder={placeholder}></input>
  )
}

export default InputText