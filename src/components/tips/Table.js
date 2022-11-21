import Tr from "./Tr";

const Table = ({ data }) => {
  function splitRow(row){
    return row.replace(/\\,/,"C-O-M-M-A").split(",").map(string => string.replace("C-O-M-M-A",","));
  }
  function parseDataToArray(text){
    if (Array.isArray(text) ) return text;
    const rows = text.split(/\r?\n\s*/);
    let returnArray = [];
    rows.forEach((row, index) => {
      returnArray[index] =  splitRow(row);
    });

    return returnArray;
  }
  const tableArray  = parseDataToArray(data);
  function rowHandler(row, rowIndex) {
    if (rowIndex === 0) return;
    return <Tr key={rowIndex} row={row} rowIndex={rowIndex} />;
  }
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
