import Tip from "./Tip";
const Tips = ({ tipList, setTagState }) => {
  const tipFlipReverse = tipList.slice(0).reverse();
  return (
    <>
      {tipFlipReverse.map((tip) => (
        <Tip key={tip.id} tip={tip} setTagState={setTagState} />
      ))}
    </>
  );
};

export default Tips;
