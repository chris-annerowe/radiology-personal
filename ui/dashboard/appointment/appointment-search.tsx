'use client';

import { TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiSearch } from "react-icons/hi";

export default function AppointmentSearch() {

    const router = useRouter();


    const performSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let searchString = e.currentTarget.value;
        if(e.key === "Enter"){
            router.push(`/dashboard/daybook/search?search=${searchString}&page=1`)
        }
    }

    return (
        <>
            <TextInput id="appointment-search" type="text" icon={HiSearch} placeholder="Search for appointments" className="" onKeyDown={performSearch} required />
        </>

    );
}