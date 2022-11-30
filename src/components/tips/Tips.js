import Tip from "./Tip";
const Tips = ({ tipList, setTagStateFromTip, editTip, showAddTipForm }) => {
  const tipFlipReverse = tipList.slice(0).reverse();
  return (
    <>
      {tipFlipReverse.map((tip) => (
        <Tip
          key={tip.id}
          tip={tip}
          setTagStateFromTip={setTagStateFromTip}
          editTip={editTip}
          showAddTipForm={showAddTipForm}
        />
      ))}
    </>
  );
};

export default Tips;
