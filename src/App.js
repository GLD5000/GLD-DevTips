import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";
import TopSection from "./components/header/TopSection";
import CombinedProviders from "./contexts/CombinedProviders";

export default function App() {
  return (
    <CombinedProviders>
        <section id="page-container" className=" h-screen overflow-y-scroll text-zinc-100 border-zinc-600">
          <h1>Hello, my name is Gareth...</h1>
          <Header
            title="DevTips"
          />
          <section id="body-container" className=" grid justify-items-center gap-2 w-screen h-fit pt-2">
            <TopSection/>
            <Tips />
          </section>
          <section id="footer" className="footer"> footer</section>
        </section>
    </CombinedProviders>
  );
}
