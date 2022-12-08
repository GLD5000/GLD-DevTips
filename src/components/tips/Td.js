
function parseLinks(cell) {
  // const regexOpenLink = /\[(?=[\w\d.*\-/\s]+\]\([\w\d.\-/:]+\))/;
  // const regexCloseLink = ")";
  console.log("Link  to be parsed");
}

const Td = ({ cell }) => {
  if (cell.includes("www")) parseLinks(cell);
  return <td>{cell}</td>;
};

export default Td;
