import { findPatientByName, findPatientByPagination, getPatientCount, getPatientSearchCount, listAllPatients } from "@/actions/patient";
import PatientList from "@/ui/dashboard/patient/patient-list";
import PatientSearch from "@/ui/dashboard/patient/patient-search";
import { Button, Pagination, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";



export default async function Patients({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

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

    const patientsList = search ? await findPatientByName(search, pageNumber, limit) : await findPatientByPagination(pageNumber, limit);
    const patientCount = search ? await getPatientSearchCount(search) : await getPatientCount();
    const patients = JSON.parse(JSON.stringify(patientsList));

    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Patients</h2>
                </div>


                <div className="flex justify-between m-2">
                    <div className="w-64">
                        <PatientSearch />
                    </div>
                    <Button href="/dashboard/patient/add">
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add Patient
                    </Button>
                </div>

                <PatientList patients={patients} patientCount={patientCount} activePage={pageNumber} limit={limit} search={search} />



            </div>

        </>
    )
}