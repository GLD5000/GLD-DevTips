import CodeBox from "../../elements/CodeBox"
import Table from "./Table";
import TextBox from "../../elements/TextBox";
import SectionTitle from "../../elements/SectionTitle";
const MultiTextBox = ({object}) => {
    const title = object["section-title"];
    const hasTitle = object["section-title"] != null;
    const content = object.content;
    const typeHandler = {
        code: <CodeBox code={content}/>,
        text: <TextBox text={content}/>,
        table: <Table dataArray={content}/>
    }
    if (hasTitle) {
        return <>
        <SectionTitle title={title}/>
        {typeHandler[object.type]}
        </>
    }
  return (
    typeHandler[object.type]
  )
}

export default MultiTextBox