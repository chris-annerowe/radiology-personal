
import DoctorForm from "@/ui/dashboard/administration/doctor-form";

export default async function Configuration() {
    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add New Doctor</h2>
                </div>
                <DoctorForm/>                
            </div>
        </>

    )
}