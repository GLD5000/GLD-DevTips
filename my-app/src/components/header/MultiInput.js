import React from 'react'

const MultiInput = () => {
  return (
    <div>
    <select name="InputType">
      <option value="text">Text</option>
      <option value="hint">Hint</option>
      <option value="code">Code</option>
      <option value="table">Table</option>
    </select>
      <textarea rows="10" cols="70" type="text" placeholder="Type or paste some text" />
    </div>
)
}

export default MultiInput