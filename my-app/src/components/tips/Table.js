import Tr from "./Tr";


const Table = ({ dataArray }) => {
    function rowHandler(row, rowIndex){
        if (rowIndex === 0) return;
        return  <Tr key={rowIndex} row={row} rowIndex={rowIndex} />

    };
  return (
    <section className="table-wrapper">

    <table>
    <thead>
    <Tr key="0" row={dataArray[0]} rowIndex="0" />
    </thead>
    <tbody>
      {dataArray.map((row, rowIndex) => (
        rowHandler(row, rowIndex)
      ))}

    </tbody>
    </table>
    </section>
  )
};

export default Table