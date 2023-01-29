import Td from './Td';

function Tr({ row, rowIndex }) {
  return (
    <tr>
      {row.map((cell, cellIndex) => (
        <Td key={`${rowIndex}${cellIndex}`} cell={cell} />
      ))}
    </tr>
  );
}

export default Tr;
