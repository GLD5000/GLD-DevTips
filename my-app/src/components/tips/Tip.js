import MultiTextBox from "./MultiTextBox";
import TipTitle from "../../elements/TipTitle";

const Tip = ({ tip }) => {
  return (
    <div className="tip">
        <TipTitle title={tip.title} />
          {tip.sections.map((object, index) => (
        <MultiTextBox key={index} object={object} />
      ))}

    </div>
  );
};

export default Tip;
