import BusinessHoursForm from "@/ui/dashboard/configuration/business-hours-form";
import { Button } from "flowbite-react";


export default async function Configuration() {
    let businessHrs:any = {}
    const getBusinessHrs = async () => {
        const resp = await fetch('/api/getBusinessHours',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
    
    const data = await resp.json();
    
    businessHrs.push(data)
    console.log("Business hours: ",data,businessHrs)
    }

    const call = getBusinessHrs()
    
    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Business Hours</h2>
                </div>
                <BusinessHoursForm configurationData={businessHrs}/>
                
            </div>
        </>

    )
}