const TitleButtons = ({ titleSet, onClick, listId }) => {
  function makeButtonArray() {
    return titleSet.map((title, index) => {
      const object = <option key={index} value={title}></option>;

      return object;
    });
  }

  const buttonArray = makeButtonArray();
  return (
    <datalist className="datalist" id={listId}>
      {buttonArray}
    </datalist>
  );
};

export default TitleButtons;
