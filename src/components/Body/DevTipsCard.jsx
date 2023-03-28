import CreateButton from '../header/CreateButton';

export default function DevTipsCard() {
  return (
    <div className="mt-16 flex h-max flex-col">
      <div className="grid w-screen max-w-body items-center self-center py-10 sm:w-full sm:px-8">
        <div className=" mx-auto mt-10 flex flex-row overflow-clip rounded-lg border-2 border-current ">
          <h1 className=" rounded-none bg-white px-2 pb-4 pt-1 font-devTips text-6xl font-black tracking-wide text-black sm:px-4 sm:pt-2 sm:pb-8 sm:text-8xl">
            DevTips
          </h1>
        </div>
        <b className=" mx-auto mt-2 mb-20 text-center text-lg sm:text-xl">
          Tips and Tricks for Developers
        </b>
      </div>
      <CreateButton />
    </div>
  );
}
