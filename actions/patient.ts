"use server"

import { db } from "@/lib/db"
import { getAge, toJSON } from "@/lib/utils";
import { ActionResponse } from "@/types/action";
import { Patient, PatientSearch } from "@/types/patient";
import PatientSchema from "@/zod/schemas/patient";
import { Prisma } from "@prisma/client";
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
   
    const [patients, count] = await db.$transaction([
        db.patient.findMany({
            skip: ((page - 1) * limit),
            take: limit
        }),
        db.patient.count()
    ])

    const data = {
        pagination: {
            count: count
        },
        data: patients
    }

    return JSON.parse(JSON.stringify(data)) 

}

export const findPatientsByNameAndDOB = async (page: number, limit: number, firstName: string, lastName: string, dob: Date | null): Promise<ActionResponse<PatientSearch>> => {
   
    //let query = `SELECT * FROM patient WHERE (first_name || ' ' || last_name) ILIKE ${'%' + name + '%'} LIMIT ${limit} OFFSET ${page - 1}`

    let queryObject = {};

    if(firstName)
        queryObject = {...queryObject, first_name: firstName}

    if(lastName)
        queryObject = {...queryObject, last_name: lastName}

    if(dob)
        queryObject = {...queryObject, dob: dob}

    console.log(queryObject);
   

    const patientSearchQuery: Prisma.patientFindManyArgs = {
        where: queryObject
    }

    const [patients, count] = await db.$transaction([
        db.patient.findMany({
            skip: ((page - 1) * limit),
            take: limit,
            where: patientSearchQuery.where
        }),
        db.patient.count({ where: patientSearchQuery.where })
    ]);

    const data = {
        pagination: {
            count: count
        },
        data: patients
    }


    return {
        success: true,
        data: JSON.parse(JSON.stringify(data))
    }

}


export const findPatientByName = async (search: string, page: number, limit: number) => {
    console.log(`Searching for patient by search string: ${search}`);


    
    
    const patients = await db.$queryRaw`SELECT * FROM patient WHERE (first_name || ' ' || last_name) ILIKE ${'%' + search + '%'} LIMIT ${limit} OFFSET ${page - 1}`;
    const patientCount: {[key: string]: any} = await db.$queryRaw`SELECT COUNT(*) FROM patient WHERE (first_name || ' ' || last_name) ILIKE ${'%' + search + '%'}`;
    
    
    /*const patientSearchQuery: Prisma.patientFindManyArgs = {
        where: {
            OR: [
                {
                    first_name: {
                        contains: search
                    },
                    last_name: {
                        contains: search
                    }

                }
            ]
            
        }
    }*/

    /*const [patients, count] = await db.$transaction([
        db.patient.findMany({
            skip: ((page - 1) * limit),
            take: limit,
            where: patientSearchQuery.where
        }),
        db.patient.count({ where: patientSearchQuery.where })
    ]);*/

    let count = JSON.parse(toJSON(patientCount));

    const data = {
        pagination: {
            count: count[0].count
        },
        data: patients
    }


    return JSON.parse(toJSON(data));

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
            //data: patientData
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
            //data: patientData
        }

    }



}