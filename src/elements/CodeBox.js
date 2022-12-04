function removeParagraphs(string){
  const regex = /[(PpPpEEE)(PpPpSSS)]/g;
  return string.replaceAll(regex, ``);
}



const CodeBox = ({content}) => {
  console.log(content);
  const code = removeParagraphs(content);
  return (
    <code className="code">{`${code}`}</code>
  )
}

export default CodeBox