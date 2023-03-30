import { useState } from 'react';
import GldSvg from '../icons/GldSvg';
import HamburgerMenu from './HamburgerMenu';
import NavBar from './NavBar';

export default function HeaderB({ toggleColourTheme, colourTheme }) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleShowMenu() {
    setShowMenu((state) => !state);
  }
  return (
    <header className="sticky top-0 left-0 right-0 z-[999] grid h-fit w-screen flex-shrink-0 flex-grow-0 grid-cols-frAutoFr content-center border-b bg-bg dark:bg-bg-dk">
      <div className=" col-start-2 ">
        <div className=" flex w-body-sm min-w-body  max-w-body flex-wrap items-center sm:w-body ">
          <div className="flex h-16 flex-wrap items-center gap-2 py-2">
            <a href="https://gld-portfolio.vercel.app/" target="_blank" rel="noreferrer">
              <GldSvg />
            </a>

            <p className=" rounded-none px-2 pb-4 pt-1 font-devTips text-4xl font-black tracking-wide text-current">
              DevTips
            </p>
          </div>
          <div className=" ml-auto w-fit">
            <NavBar
              toggleColourTheme={toggleColourTheme}
              colourTheme={colourTheme}
              toggleMenu={toggleShowMenu}
            />
          </div>
        </div>
        <HamburgerMenu
          toggleColourTheme={toggleColourTheme}
          colourTheme={colourTheme}
          show={showMenu}
        />
      </div>
    </header>
  );
}
