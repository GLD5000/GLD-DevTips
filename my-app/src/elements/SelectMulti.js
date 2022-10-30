export default function SelectMulti({tagListAll}) {
  console.log(tagListAll);

  function makeOptionsArray() {
    return tagListAll.map((option, index) => 
       <option key={index} value={option}>{option}</option>
      );
    }
    const optionsArray = makeOptionsArray();

  return (
    <select name="tags" id="tags" multiple> 
        {optionsArray}
    </select>
  )
}
