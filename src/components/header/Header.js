import CreateButton from './CreateButton';
import GldSvg from '../icons/GldSvg';
import AuthButton from './AuthButton';

export default function Header({
  title,
  showAddTipForm,
  setShowAddTipForm,
  addObjectToInputFormState,
  setSearchQuery,
  clearTags,
}) {
  return (
    <header className="sticky top-0 left-0 right-0 z-[999] grid h-16 w-screen grid-cols-frAutoFr content-center bg-neutral-800">
      <nav className=" col-start-2 flex w-body min-w-body max-w-body flex-wrap items-center justify-between align-middle  ">
        <div className="flex flex-wrap items-center gap-4 py-4">
          <GldSvg />
          <h1>{title}</h1>
        </div>
        <div className="relative flex h-full flex-wrap items-center justify-center gap-4 py-4">
          <CreateButton
            showAddTipForm={showAddTipForm}
            setShowAddTipForm={setShowAddTipForm}
            addObjectToInputFormState={addObjectToInputFormState}
            setSearchQuery={setSearchQuery}
            clearTags={clearTags}
          />
          <AuthButton />
        </div>
      </nav>
    </header>
  );
}
