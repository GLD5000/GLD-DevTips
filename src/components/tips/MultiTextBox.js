import CodeBox from "../../elements/CodeBox";
import Table from "./Table";
import Hint from "../../elements/Hint";
import TextBox from "../../elements/TextBox";
import SectionTitle from "../../elements/SectionTitle";
const MultiTextBox = ({ object }) => {
  const type = object.type;
  const title = object["title"];
  const hasTitle = object["title"] != null;
  const content = object.content;
  const typeHandler = {
    code: <CodeBox content={content} />,
    text: <TextBox text={content} />,
    table: <Table content={content} />,
    hint: <Hint content={content} />,
  };
    return (
      <div className="p-4 border-b border-dotted">
       {hasTitle&& <SectionTitle title={title} type={type} />}
        {typeHandler[type]}
      </div>
    );
};

export default MultiTextBox;
