const SectionTitle = ({title = null, type}) => {
  return (<>
    {(type === "table"|| type === "code")?
    (<h3 style={{margin: "auto"}}>{title}</h3>):
    (<h3>{title}</h3>)}
  </>
  )
}

export default SectionTitle