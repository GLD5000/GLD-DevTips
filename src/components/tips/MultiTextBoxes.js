import MultiTextBox from './MultiTextBox';

function MultiTextBoxes({ tip }) {
  return (
    <section className="relative ml-0 mb-auto flex w-full flex-col gap-4 p-2">
      {tip.sections.map((object, index) => (
        <MultiTextBox key={index} object={object} />
      ))}
    </section>
  );
}

export default MultiTextBoxes;
