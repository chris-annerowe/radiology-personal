'use server';


import { db } from "@/lib/db";



export const findAllStudies = async () => {

    const studies = db.studies.findMany();

    return studies;

}

export const findStudyByPatientId = async (patientId:string) => {
    const studies = await db.patient_studies.findMany({
        where: {
            patient_id: patientId
        }
    })
    return studies
}

export const addPatientStudy = async (patient_id:string, study_id:bigint, study_name: string, cpt_code:string) => {
    try{
        await db.patient_studies.create({
            data: {
                patient_id,
                study_id,
                study_name,
                cpt_code
            }
        })
        console.log("Patient study created successfully")
    }catch(e){ throw e }
    
}

export const findStudyById = async (id: bigint) => {
    const studies = await db.studies.findMany({
        where: {
            study_id : id
        }
    })
    return studies
}

export const findPatientStudyByStudyId = async (id: bigint) => {
    const studies = await db.patient_studies.findMany({
        where: {
            study_id: id
        }
    })
    return studies
}

export const deletePatientStudy = async (id: bigint) => {
    await db.patient_studies.delete({
        where: {
            id: id
        }
    })
    console.log("Patient Study successfully deleted.")
    return
}