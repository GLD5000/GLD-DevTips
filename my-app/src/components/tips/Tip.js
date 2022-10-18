import MultiTextBox from "./MultiTextBox";
import TipTitle from "../../elements/TipTitle";
import Tags from "./Tags";

const Tip = ({ tip }) => {
	return (
		<div className="tip">
				<TipTitle title={tip.title} />
				{tip.sections.map((object, index) => (
					<MultiTextBox key={index} object={object} />
				))}
				<Tags tagArray={tip.tags}/>
		</div>
	);
};

export default Tip;
