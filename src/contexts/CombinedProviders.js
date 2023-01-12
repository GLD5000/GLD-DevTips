import { AuthUserProvider } from "../auth";
import AppDataProvider from "./Providers/AppDataProvider";
import FilteredDataProvider from "./Providers/FilteredDataProvider";
import InputContextProvider from "./Providers/InputFormProvider";

export default function CombinedProviders({ children }) {
    
  return (
    <AuthUserProvider>
      <AppDataProvider>
        <FilteredDataProvider>
          <InputContextProvider>
            {children}
          </InputContextProvider>
        </FilteredDataProvider>
      </AppDataProvider>
    </AuthUserProvider>
  );
}
