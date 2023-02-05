import MultiTextBox from './MultiTextBox';

function MultiTextBoxes({ tip }) {
  return (
    <section className="relative ml-0 mb-auto flex w-full flex-col p-2">
      {tip.sections.map((object, index) => {
        const key = index;
        return <MultiTextBox key={key} object={object} />;
      })}
    </section>
  );
}

export default MultiTextBoxes;
