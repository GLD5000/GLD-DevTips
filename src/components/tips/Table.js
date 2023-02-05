import Tr from './Tr';

function removeParagraphs(string) {
  const regex = /(PpPpEEE)|(PpPpSSS)/g;
  return string.replaceAll(regex, ``);
}

function parseDataToArray(text) {
  if (Array.isArray(text)) return text;
  const rows = text.split(/\r?\n\s*/);
  const returnArray = [];
  rows.forEach((row, index) => {
    returnArray[index] = splitRow(row);
  });

  return returnArray;
}
function splitRow(row) {
  return row
    .replace(/\\,/g, 'C-O-M-M-A')
    .split(/[,\t]/)
    .map((string) => string.replaceAll('C-O-M-M-A', ','));
}
function rowHandler(row, rowIndex) {
  if (rowIndex === 0) return null;
  return <Tr key={rowIndex} row={row} rowIndex={rowIndex} />;
}
function Table({ content, parse = false }) {
  let data = content;
  if (parse) data = removeParagraphs(data);
  const tableArray = parseDataToArray(data);
  return (
    <section className=" my-3 flex h-fit w-full justify-center overflow-x-auto">
      <table className="border-collapse border-2 border-neutral-400 p-2 text-center text-neutral-200">
        <thead className=" bg-neutral-600 text-lg">
          <Tr key="0" row={tableArray[0]} rowIndex="0" />
        </thead>
        <tbody className=" bg-neutral-900">
          {tableArray.map((row, rowIndex) => rowHandler(row, rowIndex))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
