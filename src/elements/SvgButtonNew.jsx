import { useState } from 'react';

function getContent(reverse, showText, textElement, svg) {
  return reverse ? (
    <>
      {showText && textElement}
      {svg}
    </>
  ) : (
    <>
      {svg}
      {showText && textElement}
    </>
  );
}

export default function SvgButtonNew({
  clickFunction,
  id,
  name,
  showTextIn,
  reverse = false,
  buttonClasses = `grid-cols-frAutoFr w-full h-full 
  `,
  svg,
  textElement,
  className = `px-2 py-1
   hover:border-current
   grid     
      rounded border border-solid whitespace-pre-wrap hover:transition
    `,
}) {
  const [showText, setShowText] = useState(showTextIn || false);
  const content = getContent(reverse, showText, textElement, svg);

  return (
    <button
      type="button"
      id={id}
      name={name}
      onClick={clickFunction}
      className={`cursor-pointer items-center ${className.replaceAll(
        /[\s]+/g,
        ' '
      )} ${buttonClasses}`}
      aria-label={name}
      onFocus={() => {
        if (!showTextIn) setShowText(true);
      }}
      onMouseEnter={() => {
        if (!showTextIn) setShowText(true);
      }}
      onBlur={() => {
        if (!showTextIn) setShowText(false);
      }}
      onMouseLeave={() => {
        if (!showTextIn) setShowText(false);
      }}
    >
      {content}
    </button>
  );
}
