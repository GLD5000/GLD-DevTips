import TabButton from '../../../elements/TabButton';

export default function InputTabs({ tab, setTab }) {
  function handleClick(e) {
    const { id } = e.target;
    if (tab !== id) setTab(id);
  }

  return (
    <div className="grid w-full border-collapse grid-cols-3 rounded-none border-2 text-lg">
      <TabButton
        name="Set Tags"
        id="set-tags"
        key="set-tags"
        color="black"
        text="Set Tags"
        clickFunction={handleClick}
        className="border-r-neutral-600 bg-neutral-800 text-current hover:border-current"
        conditionalClasses="border-b-current bg-neutral-900"
        currentTab={tab}
      />
      <TabButton
        name="Write Sections"
        id="write-sections"
        key="write-sections"
        color="black"
        text="Write Sections"
        clickFunction={handleClick}
        className="bg-neutral-800 text-current hover:border-current"
        conditionalClasses="border-b-current bg-neutral-900"
        currentTab={tab}
      />
      <TabButton
        name="Preview Tip"
        id="preview-tip"
        key="preview-tip"
        color="black"
        text="Preview Tip"
        clickFunction={handleClick}
        className="border-l-neutral-600 bg-neutral-800 text-current hover:border-current"
        conditionalClasses="border-b-current  bg-neutral-900"
        currentTab={tab}
      />
    </div>
  );
}
