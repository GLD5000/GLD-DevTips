function defaultOnInput(e){
    console.log("Text input "+ e.target.value);
}

const InputText = ({placeholder="Type here...", onInput=defaultOnInput }) => {
  return (
    <input type="text" onFocus={e => e.target.select()} onChange={e => onInput(e.target.value)} placeholder={placeholder}></input>
  )
}

export default InputText