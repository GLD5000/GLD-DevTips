import { AuthUserProvider } from "../auth";
import AppDataProvider from "./Providers/AppDataProvider";
import FilteredDataProvider from "./Providers/FilteredDataProvider";
import InputFormProvider from "./Providers/InputFormProvider";

export default function CombinedProviders({ children }) {
  return (
    <AuthUserProvider>
      <AppDataProvider>
        <FilteredDataProvider>
          <InputFormProvider>{children}</InputFormProvider>
        </FilteredDataProvider>
      </AppDataProvider>
    </AuthUserProvider>
  );
}
