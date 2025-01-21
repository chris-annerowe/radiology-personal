import { Button } from "flowbite-react";


export default async function Administration() {
    return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Administration Settings</h2>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button href="/dashboard/doctor">Add Doctor</Button>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button href="/dashboard/addproduct">Add Product Item</Button>
                </div>
                <div className="mx-auto max-w-xs text-center mb-8">
                    <Button  href="/dashboard/editproduct">Edit Existing Product</Button>
                </div>
            </div>
        </>

    )
}