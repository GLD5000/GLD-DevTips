import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import Tags from "./Tags";
import { useState } from "react";

const Tip = ({ tip, setTagState }) => {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded(){
    setExpanded(!expanded);
  }
  return ( 

        <div className="tip">
        <TipTitle title={tip.title} onClick={toggleExpanded} />
        <Tags tagArray={tip.tags} setTagState={setTagState} />
        {expanded && <MultiTextBoxes tip={tip} />}
      </div>
  
  );
};

export default Tip;
