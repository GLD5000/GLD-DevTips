import MultiTextBox from "./MultiTextBox";

const Tip = ({ tip }) => {
  return (
    <>
          {tip.sections.map((object, index) => (
        <MultiTextBox key={index} object={object} />
      ))}
      ;

    </>
  );
};

export default Tip;
