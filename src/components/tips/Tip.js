import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import Tags from "./Tags";
import { useState } from "react";

const Tip = ({ tip, setTagState }) => {
  const [minimised, setMinimised] = useState(() => true);
  function toggleMinimised(){
    setMinimised(!minimised);
  }
  return ( minimised?
    <div className="tip">
      <TipTitle title={tip.title} toggleMinimised={toggleMinimised} />
      <Tags tagArray={tip.tags} setTagState={setTagState} />
    </div> :
        <div className="tip">
        <TipTitle title={tip.title} toggleMinimised={toggleMinimised} />
        <Tags tagArray={tip.tags} setTagState={setTagState} />
        <MultiTextBoxes tip={tip} />
      </div>
  
  );
};

export default Tip;
