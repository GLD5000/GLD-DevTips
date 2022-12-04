function removeParagraphs(string){
  const regex = /[(PpPpEEE)(PpPpSSS)]/g;
  return string.replaceAll(regex, ``);
}



export default function CodeBox ({content, parse = false}) {
  // console.log(content);
  const code = parse? removeParagraphs(content): content;
  return (
    <code className="code">{`${code}`}</code>
  )
}

