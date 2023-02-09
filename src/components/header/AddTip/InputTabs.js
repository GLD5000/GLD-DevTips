import TabButton from '../../../elements/TabButton';

export default function InputTabs({ tab, setTab }) {
  function handleClick(e) {
    const { id } = e.target;
    document.body.scrollTop = 44; // For Safari
    document.getElementById('page-container').scrollTop = 44;
    if (tab !== id) {
      setTab(id);
    }
  }

  return (
    <div className="sticky top-16 z-50 grid w-full grid-cols-3 gap-1 rounded-none bg-neutral-800 pb-2 text-lg">
      <TabButton
        name="Set Tags"
        id="set-tags"
        key="set-tags"
        color="black"
        text="Set Tags"
        clickFunction={handleClick}
        className="bg-neutral-900 text-current hover:bg-neutral-700"
        conditionalClasses="border-b-current bg-neutral-800"
        currentTab={tab}
      />
      <TabButton
        name="Write Sections"
        id="write-sections"
        key="write-sections"
        color="black"
        text="Write Sections"
        clickFunction={handleClick}
        className="bg-neutral-900 text-current hover:bg-neutral-700"
        conditionalClasses="border-b-current bg-neutral-800"
        currentTab={tab}
      />
      <TabButton
        name="Preview Tip"
        id="preview-tip"
        key="preview-tip"
        color="black"
        text="Preview Tip"
        clickFunction={handleClick}
        className="bg-neutral-900 text-current hover:bg-neutral-700"
        conditionalClasses="border-b-current  bg-neutral-800"
        currentTab={tab}
      />
    </div>
  );
}
