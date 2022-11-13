const TipTitle = ({title, onClick}) => {
  return (
    <button onClick={onClick}>
      <h2>{title}</h2>
    </button>
  )
}

export default TipTitle

