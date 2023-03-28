// import Header from './components/header/Header';
import { useState } from 'react';
import Body from './components/header/Body';
import CombinedProviders from './contexts/CombinedProviders';
import Footer from './components/footer/Footer';
import HeaderB from './components/header/HeaderB';
import MainContentLink from './components/header/MainContentLink';

function setThemeToLocalStorage(themeBoolean) {
  localStorage.setItem('theme', themeBoolean.toString());
}

export default function App() {
  const [colourTheme, setColourTheme] = useState(localStorage.getItem('theme') !== 'false');
  function toggleColourTheme() {
    setColourTheme((currentTheme) => !currentTheme);
    setThemeToLocalStorage(!colourTheme);
  }

  return (
    <CombinedProviders>
      <div id="theme-wrapper" className={colourTheme ? 'dark' : undefined}>
        <section
          id="page-container"
          className="relative flex h-screen flex-col overflow-y-auto overflow-x-hidden border-border bg-bg text-txt-main dark:border-border-dk dark:bg-bg-dk dark:text-txt-main-dk"
        >
          {/* <Header title="DevTips" /> */}
          <MainContentLink />
          <HeaderB toggleColourTheme={toggleColourTheme} colourTheme={colourTheme} />
          <Body />
          <Footer />
        </section>
      </div>
    </CombinedProviders>
  );
}
