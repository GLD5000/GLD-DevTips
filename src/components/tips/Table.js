import Tr from "./Tr";

function parseDataToArray(text){
  if (Array.isArray(text) ) return text;
  const rows = text.split(/\r?\n\s*/);
  let returnArray = [];
  rows.forEach((row, index) => {
    returnArray[index] =  splitRow(row);
  });

  return returnArray;
}
function splitRow(row){
  return row.replace(/\\,/g,"C-O-M-M-A").split(",").map(string => string.replace("C-O-M-M-A",","));
}
function rowHandler(row, rowIndex) {
  if (rowIndex === 0) return;
  return <Tr key={rowIndex} row={row} rowIndex={rowIndex} />;
}
const Table = ({ content }) => {
  const tableArray  = parseDataToArray(content);
  return (
    <section className="table-wrapper">
      <table>
        <thead>
          <Tr key="0" row={tableArray[0]} rowIndex="0" />
        </thead>
        <tbody>
          {tableArray.map((row, rowIndex) => rowHandler(row, rowIndex))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
