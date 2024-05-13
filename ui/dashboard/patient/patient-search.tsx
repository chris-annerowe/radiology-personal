'use client';

import { TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiSearch } from "react-icons/hi";




export default function PatientSearch() {

    const router = useRouter();


    const performSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let searchString = e.currentTarget.value;
        if(e.key === "Enter"){
            router.push(`/dashboard/patient?search=${searchString}&page=1`)
        }
    }


    return (
        <>
            <TextInput id="email4" type="email" icon={HiSearch} placeholder="Search for patients" className="mb-8" onKeyDown={performSearch} required />
        </>

    );

}