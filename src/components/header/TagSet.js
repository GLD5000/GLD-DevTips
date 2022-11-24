import TagFilter from "./TagFilter";
import Button from "../../elements/Button";

const TagSet = ({ setTagState, tagState }) => {
    function clearTags(){
      setTagState((old) => {
        const newObject = {...old};
        Object.keys(newObject).forEach((key) => {
          newObject[key] = "visible";
        });
      return newObject;
      })

    }

    function tagStateReducer(acc, entry, key) {// make first button a clear all
      const tag = entry[0];
      if (key === 0){
        acc.push(
          <Button
          name="Clear Tags"
          id="clear-tags"
          key={tag + "A" + key}
          color={"black"}
          backgroundColor={"IndianRed"}
          text={"Clear Tags"}
          clickFunction={clearTags}
          />
        );
          return acc;
      }
      acc.push(<TagFilter
        key={tag + "A" + key}
        tag={tag}
        setTagState={setTagState}
        tagState={tagState}
        />);
      return acc;
    }
    function makeButtonArray() {
      return Object.entries(tagState).reduce(tagStateReducer, []);
    }
    
    const buttonArray = makeButtonArray();
    return (
    <label>
      <h2>Filter Tags</h2>
      <section className="filter-container">
        <>
        {buttonArray}
        </>
      </section>
    </label>
    );
};

export default TagSet;
