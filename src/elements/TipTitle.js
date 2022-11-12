const TipTitle = ({title, toggleMinimised}) => {
  return (
    <button onClick={toggleMinimised}>
      <h2>{title}</h2>
    </button>
  )
}

export default TipTitle

