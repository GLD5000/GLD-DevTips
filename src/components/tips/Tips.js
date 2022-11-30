import Tip from "./Tip";
const Tips = ({ tipList, setTagState, editTip, showAddTipForm }) => {
  const tipFlipReverse = tipList.slice(0).reverse();
  return (
    <>
      {tipFlipReverse.map((tip) => (
        <Tip
          key={tip.id}
          tip={tip}
          setTagState={setTagState}
          editTip={editTip}
          showAddTipForm={showAddTipForm}
        />
      ))}
    </>
  );
};

export default Tips;
