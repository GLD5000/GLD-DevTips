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

export default function SearchTitle({ onClick, expanded }) {
  const listId = 'searchTitleList';
  const inputId = 'searchTitle';
  const title = 'Search & Filter';

  const { searchString, setSearchString } = useSearchStringContext();
  const placeholder = ' Type or select a title...';
  // const buttonArray = makeButtonArray();
  const tips = useFilteredTipsContext();
  const titleSet = Object.values(tips);

  return (
    <>
      <button
        type="button"
        className=" grid w-full grid-cols-frAutoFr justify-items-end rounded-b-none border-2 border-transparent border-b-border bg-inherit px-2 hover:border-2 hover:border-neutral-200 hover:transition focus:transition active:border-neutral-200 dark:border-b-border-dk dark:hover:border-neutral-200"
        onClick={onClick}
      >
        <label className="col-start-2" id={`${listId}label`} htmlFor={inputId}>
          <h2 className="text-2xl font-bold">{title}</h2>
        </label>
        {expanded ? <CollapseSvg /> : <ExpandSvg />}
      </button>
      <div className="px-2">
        <InputText
          idIn={inputId}
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
