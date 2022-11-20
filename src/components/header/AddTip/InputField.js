import { useState } from "react";

const InputField = ({type, changeText, name, defaultValue}) => {
    const [valueState, setValueState] = useState(defaultValue);
    function handleChange(e){
        const value = e.target.value;
        const index = e.target.name;
        changeText({content: value}, index);
    
      }
        const placeHolderObject = {
            text:`  
    Type or paste some text here...`,
    hint:`  
    Type or paste some text here...`,
            code:`
    Type or paste some code here e.g:

        function add(a, b){

            return a + b;
            
        }`,
            table:`
    Type or paste comma separated values (CSV) here e.g.

        Column Header A,Column Header B,Column Header C
        First Row A,First Row B,First Row C
        Second Row A,Second Row B,Second Row C
        Third Row A,Third Row B,Third Row C   `,
        };
      
      const placeHolder = placeHolderObject[type];

    

    return <textarea placeholder={placeHolder} name={name} className={type} rows="8" cols="70" onInput={handleChange} defaultValue={valueState}>
        </textarea>



}

export default InputField