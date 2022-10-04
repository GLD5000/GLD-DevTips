import Table from "./Table";

const Tip = ({ tip }) => {
  return (
    <div className="tip">
      <h2>{tip.title}</h2>
      <code>{tip.code}</code>
      <h3>{tip.text}</h3>
      <Table dataArray={tip.table}/>
      <p>{tip.day}</p>
    </div>
  );
};

export default Tip;
