import { useState } from "react";
import TagFilter from "./TagFilter";

const TagSet = ({ setTagState, tagState }) => {

    function tagStateReducer(acc, entry, key) {
      const tag = entry[0];
      const state = entry[1];
      if (state === "invisible") return acc;
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
