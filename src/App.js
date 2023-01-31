import Header from './components/header/Header';
import Tips from './components/tips/Tips';
import TopSection from './components/header/TopSection';
import CombinedProviders from './contexts/CombinedProviders';

export default function App() {
  return (
    <CombinedProviders>
      <section
        id="page-container"
        className=" h-screen overflow-y-scroll border-zinc-600 bg-neutral-900 text-zinc-100"
      >
        <h1 className="bg-neutral-800">Hello, my name is Gareth...</h1>
        <Header title="DevTips" />
        <main id="body-container" className=" grid h-fit w-screen justify-items-center gap-2 pt-2">
          <TopSection />
          <Tips />
        </main>
        <footer id="footer" className="footer">
          footer
        </footer>
      </section>
    </CombinedProviders>
  );
}
