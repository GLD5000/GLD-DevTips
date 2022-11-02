export default function SelectMulti({tagListAll, setTags}) {
  function makeOptionsArray() {
    return tagListAll.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
    const optionsArray = makeOptionsArray();

  return (
    <>
    <label htmlFor="tags">Chosen Tags</label>
    <select name="tags" id="tags" multiple onInput={setTags}> 
        {optionsArray}
    </select>
    </>
  )
}
