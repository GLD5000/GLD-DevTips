import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import Tags from "./Tags";

const Tip = ({ tip, setTagState}) => {
  return (
    <div className="tip">
      <TipTitle title={tip.title} />
      <Tags tagArray={tip.tags} setTagState={setTagState} />
      <MultiTextBoxes tip={tip} />
    </div>
  );
};

export default Tip;
