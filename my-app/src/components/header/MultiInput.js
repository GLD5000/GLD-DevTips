import { useState } from "react";

const MultiInput = () => {
  const [returnArray, setReturnArray] = useState(() => [

  ]);
  function handleClick(){
    setReturnArray(object => {
      const newPart =     <div>
      <select name="InputType">
        <option value="text">Text</option>
        <option value="hint">Hint</option>
        <option value="code">Code</option>
        <option value="table">Table</option>
      </select>
      <textarea
        rows="10"
        cols="70"
        type="text"
        placeholder="Type or paste some text"
      />
    </div>;
      return [...object, newPart]
    })
  }
  return ({ returnArray });
};

export default MultiInput;
