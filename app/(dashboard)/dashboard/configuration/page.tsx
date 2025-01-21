import { getConfiguration } from "@/actions/configuration";
import ConfigurationForm from "@/ui/dashboard/configuration/configuration-form";
import { Button } from "flowbite-react";



export default function Configuration() {

    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Configuration Settings</h2>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button href="/dashboard/configuration/email">Email Config</Button>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button href="/dashboard/configuration/business">Business Hours</Button>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button href="/dashboard/configuration/modality">Add/Remove Modality</Button> 
                    {/* TODO: add page and functionality for modalities */}
                </div>
            </div>
        </>

    )
}