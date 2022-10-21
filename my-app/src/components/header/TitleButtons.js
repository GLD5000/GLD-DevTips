import Button from "../../elements/Button";

const TitleButtons = ({ titleSet, onClick }) => {
    function handleClick(e){
        onClick(e.target.innerHTML);
    }

  function makeButtonArray() {
    return titleSet.map((title, index) => {
        const object =         <Button
        color="#000000"
        backgroundColor="#d0d0d0"
        text={title}
        clickFunction={handleClick}
        key={index}
        borderRadius="1000px"
        />
        
      return object;
    });
  }

  const buttonArray = makeButtonArray();
  return <div>{buttonArray}</div>;
};

export default TitleButtons;
