const styles = {
  bullet: { listStyleType: 'disc' },
  number: { listStyleType: 'decimal' },
};

export default function Li({ content, type = 'bullet' }) {
  const style = styles[type];

  return (
    <li className="m-2" style={style}>
      {content}
    </li>
  );
}
