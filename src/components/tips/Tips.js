import Tip from "./Tip";
const Tips = ({ tipList, setTagState }) => {
  return (
    <>
      {tipList.map((tip) => (
        <Tip key={tip.id} tip={tip} setTagState={setTagState} />
      ))}
    </>
  );
};

export default Tips;
