const colourClasses =
  ' text-txt-mid hover:text-txt-main hover:underline hover:decoration-current hover:underline-offset-2 hover:transition focus:text-txt-main focus:underline focus:decoration-current  focus:underline-offset-2 focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk';

export default function ExternalLink({
  content,
  link,
  mediaVisibility = 'flex',
  layoutClasses = 'flex-row gap-2',
}) {
  return (
    <a
      className={`${mediaVisibility} ${layoutClasses} ${colourClasses}`}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

ExternalLink.defaultProps = {
  mediaVisibility: 'flex',
  layoutClasses: 'flex-row gap-2',
};
