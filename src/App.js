import Header from "./components/header/Header";
import Tips from "./components/tips/Tips";
import TopSection from "./components/header/TopSection";
import CombinedProviders from "./contexts/CombinedProviders";
import DataProvider from "./DataProvider";

export default function App() {
  return (
    <CombinedProviders>
      <DataProvider>
        <section className="page-container">
          <h1>Hello, my name is Gareth...</h1>
          <Header
            title="DevTips"
          />
          <section className="body-container">
            <TopSection/>
            <section className="tip-container">
              <Tips
              />
            </section>
          </section>
          <section className="footer"> footer</section>
        </section>
      </DataProvider>
    </CombinedProviders>
  );
}
