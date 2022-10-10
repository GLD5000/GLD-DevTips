import MultiTextBox from "./MultiTextBox";

const Tip = ({ tip }) => {
  return (
    <div className="tip">
          {tip.sections.map((object, index) => (
        <MultiTextBox key={index} object={object} />
      ))}

    </div>
  );
};

export default Tip;
