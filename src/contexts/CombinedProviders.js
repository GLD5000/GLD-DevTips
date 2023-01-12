import { AuthUserProvider } from "../auth";
import AppDataProvider from "./Providers/AppDataProvider";
import FilteredDataProvider from "./Providers/FilteredDataProvider";


export default function CombinedProviders({children}) {
    function getNestedArray(children){

        const importArray = [
            AppDataProvider,
            FilteredDataProvider
        ];
        return importArray.reduceRight(reducer, children);

        function reducer(children, currentElement){
            return currentElement({children});
        }

    }
    // console.log(getNestedArray(children));
    return (
    <AuthUserProvider>
        <AppDataProvider>
            <FilteredDataProvider>
                {children}
            </FilteredDataProvider>
        </AppDataProvider>
    </AuthUserProvider>
  )
}
