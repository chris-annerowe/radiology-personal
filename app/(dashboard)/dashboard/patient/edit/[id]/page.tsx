import { findPatientById } from "@/actions/patient";
import PatientForm from "@/ui/dashboard/patient/patient-form";



export default async function EditPage({ params }: { params: { id: string}}){

    const patient = await findPatientById(params.id);

    

    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit Patient</h2>
                </div>

                <PatientForm patient={patient} />
                
                
            </div>
        </>
    )

}