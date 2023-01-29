import Td from './Td';

const Tr = ({ row, rowIndex }) => {
  return (
    <tr>
      {row.map((cell, cellIndex) => (
        <Td key={`${rowIndex}${cellIndex}`} cell={cell} />
      ))}
    </tr>
  );
};

export default Tr;
