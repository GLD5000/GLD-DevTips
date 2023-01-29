import { useFilteredTipsContext } from '../../contexts/Providers/FilteredTipsProvider';

export default function TitleButtons({ listId }) {
  const tips = useFilteredTipsContext();
  const titleSet = Object.values(tips);
  function makeButtonArray() {
    return titleSet.map((tip) => {
      const title = tip.title;
      const id = tip.id;
      const object = <option className="text-black" key={id} value={title}></option>;

      return object;
    });
  }

  const buttonArray = makeButtonArray();
  return (
    <datalist className="datalist" id={listId}>
      {buttonArray}
    </datalist>
  );
}
