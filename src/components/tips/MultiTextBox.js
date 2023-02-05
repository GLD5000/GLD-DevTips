import CodeBox from '../../elements/CodeBox';
import Table from './Table';
import Hint from '../../elements/Hint';
import TextBox from '../../elements/TextBox';
import SectionTitle from '../../elements/SectionTitle';

function MultiTextBox({ object }) {
  const { type } = object;
  const { title } = object;
  const hasTitle = object.title != null;
  const { content } = object;
  const typeHandler = {
    code: <CodeBox content={content} />,
    text: <TextBox text={content} />,
    table: <Table content={content} />,
    hint: <Hint content={content} />,
  };
  return (
    <div className="my-2 w-full">
      {hasTitle && <SectionTitle title={title} type={type} />}
      {typeHandler[type]}
    </div>
  );
}

export default MultiTextBox;
