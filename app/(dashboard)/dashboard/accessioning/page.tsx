'use server'

import AccessioningTabs from "@/ui/dashboard/accessioning/accessioning-tabs";
import { findPatientById } from "@/actions/patient";
import { Patient } from "@/types/patient";


export default async function Accessioning({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    let search = null;
    let patient:Patient = {
        patient_id: "",
        first_name: "",
        last_name: "",
        other_name: "",
        title: "",
        dob: new Date(),
        age: 0,
        sex: "",
        height: 0,
        weight: 0,
        allergies: "",
        nationality: "",
        next_kin: "",
        address_1: "",
        address_2: "",
        city: "",
        parish: "",
        telephone_1: "",
        telephone_2: "",
        cellular: "",
        email: "",
        id_type: "",
        idnum: ""
    
    }    

    const searchParam = searchParams["id"];

    if (searchParam) {

        search = Array.isArray(searchParam) ? searchParam[0] : searchParam

    }

    const patientSearchResult = async() => {
        if(typeof searchParam === 'string'){
            const resp = await findPatientById(searchParam)
            
            if(resp){
                patient.patient_id = resp?.patient_id
                patient.first_name = resp?.first_name
                patient.last_name = resp?.last_name
                patient.other_name = resp?.other_name
                patient.title = resp?.title
                patient.dob = resp?.dob
                patient.age = resp?.age
                patient.sex = resp?.sex
                patient.nationality = resp?.nationality
                patient.address_1 = resp?.address_1
                patient.address_2 = resp?.address_2
                patient.city = resp?.city
                patient.parish = resp?.parish
                patient.telephone_1 = resp?.telephone_1
                patient.telephone_2 = resp?.telephone_2
                patient.cellular = resp?.cellular
                patient.email = resp?.email
                patient.id_type = resp?.id_type
                patient.idnum = resp?.idnum
            }

            console.log("Patient to accession from patient list ",patient)
        }
        console.log("No search param ", searchParam,patient)
    }

    const pat = await patientSearchResult()

    return (
        <>
            <AccessioningTabs patient={patient}/>
        </>
    )
}