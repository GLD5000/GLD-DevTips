const SectionTitle = ({title, type}) => {
  return (<>
    {(type === "table")?
    (<h3 style={{margin: "auto"}}>{title}</h3>):
    (<h3>{title}</h3>)}
  </>
  )
}

export default SectionTitle