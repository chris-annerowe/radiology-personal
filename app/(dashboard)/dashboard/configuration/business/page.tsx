import { getConfiguration } from "@/actions/configuration";
import BusinessHoursForm from "@/ui/dashboard/configuration/business-hours-form";
import { Button } from "flowbite-react";



export default async function Configuration() {
    const existingConfigurationData = await getConfiguration(); //TODO: update to pull existing business hours
    
    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Business Hours</h2>
                </div>
                <BusinessHoursForm configurationData={existingConfigurationData}/>
                
            </div>
        </>

    )
}