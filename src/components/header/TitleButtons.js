import { useFilteredTipsContext } from '../../contexts/Providers/FilteredTipsProvider';

export default function TitleButtons({ listId }) {
  const tips = useFilteredTipsContext();
  const titleSet = Object.values(tips);
  function makeButtonArray() {
    return titleSet.map((tip) => {
      const { title } = tip;
      const { id } = tip;
      const object = <option className="text-black" key={id} value={title} />;

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
