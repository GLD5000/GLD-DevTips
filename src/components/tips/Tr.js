import Td from './Td';

function Tr({ row, rowIndex }) {
  return (
    <tr>
      {row.map((cell, cellIndex) => {
        const key = `${rowIndex}${cellIndex}`;
        return <Td key={key} cell={cell} />;
      })}
    </tr>
  );
}

export default Tr;
