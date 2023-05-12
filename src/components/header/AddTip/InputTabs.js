import TabButton from '../../../elements/TabButton';

export default function InputTabs({ tab, setTab }) {
  function handleClick(e) {
    const { id } = e.target;
    // document.body.scrollTop = 44; // For Safari
    // document.getElementById('page-container').scrollTop = 44;
    if (tab !== id) {
      setTab(id);
    }
  }

  return (
    <div className="sticky top-16 z-50 grid w-full grid-cols-3 gap-1 rounded-none bg-white pb-2 text-lg dark:bg-neutral-800">
      <TabButton
        name="Set Tags"
        id="set-tags"
        key="set-tags"
        color="black"
        text="Set Tags"
        clickFunction={handleClick}
        className="text-current dark:bg-neutral-900 dark:hover:bg-neutral-700"
        conditionalClasses="border-b-current  dark:bg-neutral-800"
        currentTab={tab}
      />
      <TabButton
        name="Write Sections"
        id="write-sections"
        key="write-sections"
        color="black"
        text="Write Sections"
        clickFunction={handleClick}
        className="text-current dark:bg-neutral-900 dark:hover:bg-neutral-700"
        conditionalClasses="border-b-current  dark:bg-neutral-800"
        currentTab={tab}
      />
      <TabButton
        name="Preview Tip"
        id="preview-tip"
        key="preview-tip"
        color="black"
        text="Preview Tip"
        clickFunction={handleClick}
        className="text-current dark:bg-neutral-900 dark:hover:bg-neutral-700"
        conditionalClasses="border-b-current   dark:bg-neutral-800"
        currentTab={tab}
      />
    </div>
  );
}
