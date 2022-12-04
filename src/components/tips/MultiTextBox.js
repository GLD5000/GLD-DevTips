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
  if (hasTitle) {
    return (
      <>
        <SectionTitle title={title} type={type} />
        {typeHandler[type]}
      </>
    );
  }
  return typeHandler[type];
};

export default MultiTextBox;
