import CollapseSvg from '../components/icons/CollapseSvg';
import ExpandSvg from '../components/icons/ExpandSvg';
import InputText from './InputText';
import { useSearchStringContext } from '../contexts/Providers/SearchStringProvider';
import { useFilteredTipsContext } from '../contexts/Providers/FilteredTipsProvider';

// function makeButtonArray() {
//   const tips = useFilteredTipsContext();
//   const titleSet = Object.values(tips);

//   return titleSet.map((tip) => {
//     const { title } = tip;
//     const { id } = tip;
//     const object = <option className="text-black" key={id} value={title} />;

//     return object;
//   });
// }

export default function SearchTitle({ title, onClick, expanded, listId }) {
  const { searchString, setSearchString } = useSearchStringContext();
  const placeholder = ' Type or select a title...';
  // const buttonArray = makeButtonArray();
  const tips = useFilteredTipsContext();
  const titleSet = Object.values(tips);

  return (
    <>
      <button
        type="button"
        className=" grid w-full grid-cols-frAutoFr justify-items-end rounded-b-none border-2 border-transparent border-b-neutral-600 bg-inherit px-2 delay-100 duration-200 ease-in-out hover:border-2 hover:border-neutral-200 active:border-neutral-200"
        onClick={onClick}
      >
        <label className="col-start-2" id={`${listId}label`} htmlFor={listId}>
          <h2>{title}</h2>
        </label>
        {expanded ? (
          <CollapseSvg className="tip-title-svg col-start-3" />
        ) : (
          <ExpandSvg className="tip-title-svg col-start-3" />
        )}
      </button>
      <div className="px-2">
        <InputText
          placeholder={placeholder}
          onInput={setSearchString}
          type="search"
          value={searchString}
          listId={listId}
        />
        <datalist className="datalist" id={listId}>
          {titleSet.map((tip) => {
            const { title: value, id } = tip;
            const object = (
              <option
                aria-labelledby={`${listId}label`}
                className="text-black"
                key={id}
                value={value}
              />
            );

            return object;
          })}
        </datalist>
      </div>
    </>
  );
}
