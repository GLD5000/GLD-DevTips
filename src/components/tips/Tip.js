import MultiTextBoxes from "./MultiTextBoxes";
import TipTitle from "../../elements/TipTitle";
import Tags from "./Tags";
import { useState } from "react";
import Button from "../../elements/Button";

const Tip = ({ tip, setTagState, editTip }) => {
  const [expanded, setExpanded] = useState(() => false);
  function toggleExpanded(){
    setExpanded(!expanded);
  }
  return ( 

        <div className="tip">
        <TipTitle title={tip.title + tip.preview} onClick={toggleExpanded} expanded={expanded}/>
        {expanded && <>
        <MultiTextBoxes tip={tip} /> 
        <Button
        key={tip.id}
        id={tip.id}
        color="black"
        backgroundColor="white"
        text="Edit tip"
        clickFunction={editTip}
      />
        </>}
        <Tags tagArray={tip.tags} setTagState={setTagState} />
        {tip.updated &&  <p>{tip.updated}</p>}
      </div>
  
  );
};

export default Tip;
