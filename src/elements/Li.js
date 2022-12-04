const styles = {
  bullet: {listStyleType: "disc"},
  number: {listStyleType: "decimal"}
}


export default function Li({content, type = "bullet" }) {

  const style = styles[type];

    return (
      <li className="li" style={style}>{content}</li>
    )
  }
  