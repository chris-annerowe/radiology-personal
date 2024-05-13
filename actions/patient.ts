"use server"

import { db } from "@/lib/db"
import { getAge } from "@/lib/utils";
import { ActionResponse } from "@/types/action";
import PatientSchema from "@/zod/schemas/patient";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

const dbExt = db.$extends({
    result: {
        patient: {
            full_name: {
                needs: { first_name: true, last_name: true },
                compute(patient) {
                    return `${patient.first_name} ${patient.last_name}`
                }
            }
        }
    }
})

export const listAllPatients = async () => {

    const patients = db.patient.findMany();

    return patients;
}

export const findPatientById = async (id: string) => {
    const patient = db.patient.findUnique({
        where: {
            patient_id: id
        }
    })

    return patient;
}

export const findPatientByPagination = async (page: number, limit: number) => {
    const patients = db.patient.findMany({
        skip: ((page - 1) * limit),
        take: limit
    });

    return patients

}

export const findPatientByName = async (name: string, page: number, limit: number) => {
    const searchName = name;
    let patients;
    console.log(`Searching for patient last name starting: ${searchName}`);

    
    patients = dbExt.patient.findMany({
        skip: ((page - 1) * limit),
        take: limit,
        where: {
            last_name: {
                startsWith: searchName
            }
        }
    })
    

    return patients;

}

export const getPatientCount = async () => {
    const patientCount = await db.patient.count();
    return patientCount;
}

export const getPatientSearchCount = async (searchName: string) => {
    const patientCount = await db.patient.count({
        where: {
            last_name: {
                startsWith: searchName
            }
        }
    });
    return patientCount;
}

export const savePatient = async (prevState: any, formData: FormData): Promise<ActionResponse> => {

    console.log(formData);

    const patientData = {
        patient_id: randomUUID(),
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        other_name: formData.get('other_name') as string,
        title: formData.get('title') as string,
        dob: new Date(formData.get('dob') as string),
        age: getAge(formData.get('dob') as string),
        sex: formData.get('sex') as string,
        height: parseFloat(formData.get('height') as string),
        weight: parseFloat(formData.get('weight') as string),
        allergies: formData.get('allergies') as string,
        nationality: formData.get('nationality') as string,
        next_kin: formData.get('next_kin') as string,
        address_1: formData.get('address_1') as string,
        address_2: formData.get('address_2') as string,
        city: formData.get('city') as string,
        parish: formData.get('parish') as string,
        telephone_1: formData.get('telephone_1') as string,
        telephone_2: formData.get('telephone_2') as string,
        cellular: formData.get('cellular') as string,
        email: formData.get('email') as string,
        id_type: formData.get('id_type') as string,
        idnum: formData.get('idnum') as string

    }

    const validatedFields = PatientSchema.safeParse(patientData)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log("Validation Failed");
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {
        console.log("Validation Succeeded");
        const patient = await db.patient.create({
            data: patientData
        })

        return {
            success: true,
            data: patientData
        }

    }



}

export const updatePatient = async (patientId: string, prevState: any, formData: FormData): Promise<ActionResponse> => {

    console.log(formData);

    const patientData = {
        patient_id: patientId,
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        other_name: formData.get('other_name') as string,
        title: formData.get('title') as string,
        dob: new Date(formData.get('dob') as string),
        age: getAge(formData.get('dob') as string),
        sex: formData.get('sex') as string,
        height: parseFloat(formData.get('height') as string),
        weight: parseFloat(formData.get('weight') as string),
        allergies: formData.get('allergies') as string,
        nationality: formData.get('nationality') as string,
        next_kin: formData.get('next_kin') as string,
        address_1: formData.get('address_1') as string,
        address_2: formData.get('address_2') as string,
        city: formData.get('city') as string,
        parish: formData.get('parish') as string,
        telephone_1: formData.get('telephone_1') as string,
        telephone_2: formData.get('telephone_2') as string,
        cellular: formData.get('cellular') as string,
        email: formData.get('email') as string,
        id_type: formData.get('id_type') as string,
        idnum: formData.get('idnum') as string

    }

    const validatedFields = PatientSchema.safeParse(patientData)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log("Validation Failed");
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {
        console.log("Validation Succeeded");
        const patient = await db.patient.update({
            where: {
                patient_id: patientId
            },
            data: patientData
        })

        revalidatePath('/dashboard/patient');

        return {
            success: true,
            data: patientData
        }

    }



}