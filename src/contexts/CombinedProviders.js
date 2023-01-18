import { AuthUserProvider } from "../auth";
import TagsProvider from "./Providers/TagsProvider"
import TipsProvider from "./Providers/TipsProvider"
import FilteredTipsProvider from "./Providers/FilteredTipsProvider";
import InputFormProvider from "./Providers/InputFormProvider";

export default function CombinedProviders({ children }) {
  return (
    <AuthUserProvider>
      <TipsProvider>
        <TagsProvider>
          <FilteredTipsProvider>
            <InputFormProvider>{children}</InputFormProvider>
          </FilteredTipsProvider>
        </TagsProvider>
      </TipsProvider>
    </AuthUserProvider>
  );
}
