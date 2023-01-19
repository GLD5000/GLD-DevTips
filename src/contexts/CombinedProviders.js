import { AuthUserProvider } from "../auth";
import TagsProvider from "./Providers/TagsProvider";
import SearchStringProvider from "./Providers/SearchStringProvider";
import TipsProvider from "./Providers/TipsProvider";
import FilteredTipsProvider from "./Providers/FilteredTipsProvider";
import InputFormProvider from "./Providers/InputFormProvider";

export default function CombinedProviders({ children }) {
  return (
    <AuthUserProvider>
      <TipsProvider>
        <TagsProvider>
          <SearchStringProvider>
            <FilteredTipsProvider>
              <InputFormProvider>{children}</InputFormProvider>
            </FilteredTipsProvider>
          </SearchStringProvider>
        </TagsProvider>
      </TipsProvider>
    </AuthUserProvider>
  );
}
