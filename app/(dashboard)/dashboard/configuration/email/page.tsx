import { getConfiguration } from "@/actions/configuration";
import ConfigurationForm from "@/ui/dashboard/configuration/configuration-form";
import { Button } from "flowbite-react";



export default async function Configuration() {
    const existingConfigurationData = await getConfiguration();
    
    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Email Configuration</h2>
                </div>
                <ConfigurationForm configurationData={existingConfigurationData}/>
                
            </div>
        </>

    )
}