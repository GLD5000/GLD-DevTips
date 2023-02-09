import Header from './components/header/Header';
import TopSection from './components/header/TopSection';
import CombinedProviders from './contexts/CombinedProviders';

export default function App() {
  return (
    <CombinedProviders>
      <section
        id="page-container"
        className="flex h-screen flex-col overflow-y-auto overflow-x-hidden border-zinc-600 bg-neutral-900 text-zinc-100"
      >
        <h1 className="bg-neutral-800">Hello, my name is Gareth...</h1>
        <Header title="DevTips" />
        <TopSection />
        <footer id="footer" className=" h-10 flex-grow-0">
          footer
        </footer>
      </section>
    </CombinedProviders>
  );
}
