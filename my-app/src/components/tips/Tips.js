import  Tip  from "./Tip";
const Tips = ({ tipList }) => {
  return (
    <>
      {tipList.map((tip) => (
        <Tip key={tip.id} tip={tip} />
      ))}
      ;
    </>
  );
};

export default Tips;
