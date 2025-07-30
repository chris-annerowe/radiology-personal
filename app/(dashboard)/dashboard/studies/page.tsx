import { findWorklists } from "@/actions/worklist";
import StudiesList from "@/ui/dashboard/studies/studies-list";






export default async function Studies({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}){

    let pageNumber = 1;

    let search = null;

    const pageNumberParam = searchParams["page"];
    const searchParam = searchParams["search"];

    if (pageNumberParam) {
        try {
            if (Array.isArray(pageNumberParam)) {
                pageNumber = parseInt(pageNumberParam[0])
            } else {
                pageNumber = parseInt(pageNumberParam);
            }
        } catch (e) {
            console.log("Page number parameter invalid.")
        }
    }

    if (searchParam) {

        search = Array.isArray(searchParam) ? searchParam[0] : searchParam

    }

    const limit = 5;

    const worklistSearchResult = await findWorklists(pageNumber, limit);

    const worklists = worklistSearchResult.data;

    const worklistCount = worklistSearchResult.pagination.count;

    return (
            <>
                <div className="px-16">
                    <div className="mx-auto max-w-2xl text-center mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Studies</h2>
                    </div>
    
    
                    <div className="flex justify-between m-2">
                      
                    </div>

                    <StudiesList studies={worklists} studiesCount={worklistCount} activePage={pageNumber} limit={limit} search={search} />
    
    
    
    
                </div>
    
            </>
        )

}